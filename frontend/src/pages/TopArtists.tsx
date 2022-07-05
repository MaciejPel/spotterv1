import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSpotifyAPI } from '../utils/spotifyApi';
import ArtistCard from '../components/ArtistCard';
import Spinner from '../components/Spinner';
import AsideQueries from '../components/AsideQueries';
import { AsideType, ArtistsProps } from '../types/types';
import useAuth from '../hooks/useAuth';

const TopArtists: React.FC = () => {
	document.title = 'Top Artists | Spotter';
	const [searchParams] = useSearchParams();
	const timeRange = searchParams.get('time_range');
	const limit = searchParams.get('limit');
	const { accessToken } = useAuth();
	const { data, isLoading, isError, error, isRefetching, refetch } = useQuery(
		'TopArtists',
		() =>
			fetchSpotifyAPI(
				`/me/top/artists?time_range=${timeRange ? timeRange : 'short_term'}&limit=${
					limit ? limit : '25'
				}`,
				accessToken
			),
		{ refetchOnWindowFocus: false }
	);

	useEffect(() => {
		refetch();
	}, [searchParams, refetch]);

	return (
		<div className="artists">
			<main className="artists__main">
				{isError && error instanceof Error && <div className="artists__error">{error.message}</div>}
				{data && !isLoading && !isRefetching && (
					<div className="artists__grid">
						{data.items.map((artist: ArtistsProps, index: number) => (
							<ArtistCard
								name={artist.name}
								image={artist.images.length ? artist.images[1].url : null}
								index={index + 1}
								uri={artist.uri}
								key={artist.id}
							/>
						))}
					</div>
				)}
				{(isLoading || isRefetching) && <Spinner />}
			</main>
			<AsideQueries type={AsideType.DATA} />
		</div>
	);
};

export default TopArtists;
