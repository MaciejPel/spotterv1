import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSpotifyAPI } from '../utils/spotifyApi';
import { AsideType } from '../types/types';
import { Pie } from 'react-chartjs-2';
import AsideQueries from '../components/AsideQueries';
import useWindowSize from '../hooks/useWindowSize';
import 'chart.js/auto';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';

const TopGenres: React.FC = () => {
	document.title = 'Top Genres | Spotter';
	const [searchParams] = useSearchParams();
	const timeRange = searchParams.get('time_range');
	const window = useWindowSize();
	const { accessToken } = useAuth();
	const { isDark } = useTheme();
	const [size, setSize] = useState<number>(10);
	const [legend, setLegend] = useState<boolean>(false);
	const [stats, setStats] = useState<{ name: string; amount: number }[]>([]);
	const { data, isError, error, refetch } = useQuery(
		'TopGenres',
		() =>
			fetchSpotifyAPI(
				`/me/top/artists?time_range=${timeRange ? timeRange : 'short_term'}&limit=50`,
				accessToken
			),
		{ refetchOnWindowFocus: false }
	);

	useEffect(() => {
		refetch();
	}, [searchParams, refetch]);

	useEffect(() => {
		let temp: { name: string; amount: number }[] = [];
		if (data) {
			data.items.forEach((item: any) => {
				item.genres.forEach((genre: any) => {
					let obj = temp.findIndex((x) => x.name === genre);
					obj >= 0 ? (temp[obj].amount += 1) : temp.push({ name: genre, amount: 1 });
				});
			});
			size === -1
				? setStats(() => temp.sort((f, s) => s.amount - f.amount))
				: setStats(() => temp.sort((f, s) => s.amount - f.amount).slice(0, size));
		}
	}, [data, size]);

	const generateColors = (size: number): string[] => {
		const startValues = [0, 50, 50];
		const jump = Math.ceil(255 / size);
		var result = [];
		for (var i = 0; i < size; i++) {
			result.push(`hsl(${startValues[0] + i * jump}, ${startValues[1]}%, ${[startValues[2]]}%)`);
		}
		return result;
	};

	return (
		<div className="genres">
			<main className="genres__main">
				{isError && error instanceof Error && <div className="genres__error">{error.message}</div>}
				{data && !isError && (
					<Pie
						data={{
							labels: stats.map((data) => data.name),
							datasets: [
								{
									data: stats.map((data) => data.amount),
									backgroundColor: generateColors(stats.length),
									borderColor: '#000',
								},
							],
						}}
						options={{
							layout: {
								padding: {
									bottom: window.width < 769 ? 0 : 150,
									left: window.width < 769 ? 0 : 25,
									right: window.width < 769 ? 0 : 25,
								},
							},
							plugins: {
								legend: {
									labels: {
										color: isDark ? '#fff' : '000',
									},
									display: legend,
									position: window.width < 769 ? 'bottom' : 'left',
								},
								tooltip: {
									callbacks: {
										label: function (context) {
											const label = context.label,
												index = context.dataIndex,
												data = context.dataset.data;
											var total = 0;
											for (var i = 0; i < data.length; i++) {
												total += data[i];
											}
											return label + ' — ' + ((data[index] / total) * 100).toFixed(2) + '%';
										},
									},
								},
							},
						}}
					/>
				)}
			</main>
			<AsideQueries
				type={AsideType.GRAPH}
				size={size}
				setSize={setSize}
				setLegend={setLegend}
				legend={legend}
			/>
		</div>
	);
};

export default TopGenres;
