import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchSpotifyAPI } from '../utils/spotifyApi';
import { AsideType, TrackProps } from '../types/types';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';
import AsideQueries from '../components/AsideQueries';

const TopTracks: React.FC = () => {
	document.title = 'Top Tracks | Spotter';
	const [searchParams] = useSearchParams();
	const timeRange = searchParams.get('time_range');
	const limit = searchParams.get('limit');
	const { accessToken } = useAuth();
	const { data, isLoading, isError, error, isRefetching, refetch } = useQuery(
		'TopTracks',
		() =>
			fetchSpotifyAPI(
				`/me/top/tracks?time_range=${timeRange ? timeRange : 'short_term'}&limit=${
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
		<div className="tracks">
			<main className="tracks__main">
				{isError && error instanceof Error && <div className="tracks__error">{error.message}</div>}
				{data && !isLoading && !isRefetching && !isError && (
					<table className="tracks__table">
						<thead className="tracks__table__head">
							<tr className="tracks__table__head_tr">
								<th className="tracks__table__head_th tracks__table__head_th_first">#</th>
								<th className="tracks__table__head_th tracks__table__head_th_second">Image</th>
								<th className="tracks__table__head_th tracks__table__head_th_third">Title</th>
								<th className="tracks__table__head_th tracks__table__head_th_fourth">Artist</th>
							</tr>
						</thead>
						<tbody className="tracks__table__body">
							{data &&
								data.items.map(
									(track: TrackProps, index: number) =>
										track.album.images[2].url && (
											<tr
												key={track.id}
												className="tracks__table__body__tr"
											>
												<td className="tracks__table__body__td tracks__table__body__td__first">
													{index + 1}
												</td>
												<td className="tracks__table__body__td tracks__table__body__td__second">
													<a
														href={track.uri}
														className="tracks__table__body__link"
													>
														<img
															src={track.album.images[2].url}
															alt=""
															className="tracks__table__body__image"
														/>
													</a>
												</td>
												<td className="tracks__table__body__td tracks__table__body__td__third">
													<a
														className="link"
														href={track.uri}
													>
														{track.name}
													</a>
												</td>
												<td className="tracks__table__body__td tracks__table__body__td__fourth">
													{track.artists.map((artist, index) => (
														<a
															key={artist.id}
															href={artist.uri}
															target="_blank"
															rel="noreferrer"
															className="link"
														>
															{(index ? ', ' : '') + artist.name}
														</a>
													))}
												</td>
											</tr>
										)
								)}
						</tbody>
					</table>
				)}
				{(isLoading || isRefetching) && <Spinner />}
			</main>
			<AsideQueries type={AsideType.DATA} />
		</div>
	);
};

export default TopTracks;
