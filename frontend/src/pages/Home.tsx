import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { usePalette } from 'react-palette';
import { currentArtistsProps } from '../types/types';
import { fetchSpotifyAPI } from '../utils/spotifyApi';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';

const Home: React.FC = () => {
	document.title = 'Home | Spotter';
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

	useEffect(() => {
		if (searchParams.has('code') && accessToken) {
			searchParams.delete('code');
			setSearchParams(searchParams);
		}
	}, [searchParams, accessToken, setSearchParams]);

	return (
		<div
			className={`home ${data ? (data.is_playing ? 'playing' : 'paused') : ''} ${
				data ? (data.currently_playing_type === 'ad' ? ' home__playing__ad' : '') : ''
			}`}
			style={{
				background: `linear-gradient(0deg, ${
					isDark ? imageData.darkMuted : imageData.vibrant
				} 0%, ${isDark ? imageData.darkVibrant : imageData.muted} 100%)`,
			}}
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
