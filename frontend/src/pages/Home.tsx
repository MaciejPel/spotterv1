import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { usePalette } from 'react-palette';
import { currentArtistsProps } from '../types/types';
import { fetchSpotifyAPI } from '../utils/spotifyApi';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';

const Home: React.FC = () => {
	document.title = 'Home | Spotter';
	const container = useRef<HTMLInputElement>(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const { accessToken } = useAuth();
	const { isDark } = useTheme();

	const { data, isLoading } = useQuery('player', () => fetchSpotifyAPI('/me/player', accessToken), {
		refetchInterval: 5000,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: false,
	});

	const { data: imageData } = usePalette(
		data?.item?.album?.images
			? data.currently_playing_type !== 'ad'
				? data.item.album.images[0].url
				: ''
			: ''
	);

	function getRGB(color: string) {
		const r = parseInt(color.slice(1, 3), 16);
		const g = parseInt(color.slice(3, 5), 16);
		const b = parseInt(color.slice(5, 7), 16);
		return [r, g, b];
	}

	async function setGradientBackground() {
		if (!container.current || !Object.keys(imageData).length) return;

		const currentGrad = container.current.style.getPropertyValue('background');
		const regex = /[\d,]+/g;
		const matches =
			currentGrad
				.match(regex)
				?.map((v) => v.replace(',', ''))
				.filter((v) => v !== '')
				.map((v) => parseInt(v)) || Array(6).fill(isDark ? 34 : 250);

		const hexFallback = isDark ? '#ffffff' : '000000';
		const current = { a: matches.slice(0, 3), b: matches.slice(3, 6) };
		const future = {
			a: getRGB(isDark ? imageData.darkMuted || hexFallback : imageData.vibrant || hexFallback),
			b: getRGB(isDark ? imageData.darkVibrant || hexFallback : imageData.muted || hexFallback),
		};

		while (true) {
			await new Promise((resolve) => setTimeout(resolve, 15));

			for (const k of ['a', 'b']) {
				let key = k as 'a' | 'b';
				for (let i = 0; i < 3; i++) {
					if (current[key][i] < future[key][i]) current[key][i]++;
					else if (current[key][i] > future[key][i]) current[key][i]--;
				}
			}

			container.current.style.background = `linear-gradient(rgb(${current.a.join(
				','
			)}), rgb(${current.b.join(',')}))`;

			if (
				(['a', 'b'] as const).every((key) => current[key].every((v, i) => v === future[key][i]))
			) {
				break;
			}
		}
	}

	useEffect(() => {
		setGradientBackground();
	}, [imageData, isDark]);

	useEffect(() => {
		if (searchParams.has('code') && accessToken) {
			searchParams.delete('code');
			setSearchParams(searchParams);
		}
	}, [searchParams, accessToken, setSearchParams]);

	return (
		<div
			ref={container}
			className={`home ${data ? (data.is_playing ? 'playing' : 'paused') : ''} ${
				data ? (data.currently_playing_type === 'ad' ? ' home__playing__ad' : '') : ''
			}`}
		>
			{accessToken !== '401' && !data && !isLoading && (
				<div className="home__empty">
					<div>It's kind of empty in here 😪</div>
					<div>Play some tunes on Spotify to brighten up the place</div>
				</div>
			)}
			{accessToken === '401' && (
				<div className="home__empty">
					<div>Refreshing Auth</div>
				</div>
			)}
			{data && data.currently_playing_type === 'ad' && (
				<div className="home__currently__ad">Advertisment is currently playing...🙄</div>
			)}
			{data && data.currently_playing_type !== 'ad' && (
				<>
					<div className="home__album">
						<img
							className="home__album__image"
							src={data ? data.item.album.images[0].url : ''}
							alt={(data ? data.item.name : 'Album') + ' cover'}
						/>
					</div>
					<div className="home__title">
						<a
							className="link"
							href={data.item.uri}
						>
							{data.item.name}
						</a>
					</div>
					<div className="home__artists">
						{data.item.artists.map((artist: currentArtistsProps, index: number) => (
							<a
								className="home__artists__link link"
								key={artist.id}
								href={artist.uri}
								target="_blank"
								rel="noreferrer"
							>
								{(index ? ', ' : '') + artist.name}
							</a>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
