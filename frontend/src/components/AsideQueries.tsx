import { useSearchParams } from 'react-router-dom';
import { AsideType, AsideProps } from '../types/types';
import useTheme from '../hooks/useTheme';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/tippy.css';

const queries = [
	{
		title: 'Time range',
		description: 'Retrives data from specific time to current day',
		values: ['short', 'medium', 'long'],
		valuesDescription: ['Last 4 weeks', 'Last 6 months', 'Last few years'],
		searchParam: 'time_range',
		completeParam: '_term',
		defaultValue: 0,
		type: [AsideType.DATA, AsideType.GRAPH],
	},
	{
		title: 'Number of records',
		description: 'Number of returned records',
		values: ['15', '25', '50'],
		valuesDescription: ['15 records', '25 records', '50 records'],
		searchParam: 'limit',
		completeParam: '',
		defaultValue: 1,
		type: [AsideType.DATA],
	},
];

const sizeOptions = {
	title: 'Number of records',
	description: 'Number of returned records',
	values: ['10', '20', 'All'],
	actualValues: [10, 20, -1],
	valuesDescription: ['10 records', '20 records', 'All records'],
	defaultValue: 10,
};

const legendOptions = {
	title: 'Legend',
	values: ['Yes', 'No'],
	actualValues: [true, false],
	valuesDescription: ['Yes', 'No'],
	defaultValue: false,
};

const AsideQueries: React.FC<AsideProps> = ({ type, size, setSize, legend, setLegend }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { currentMode } = useTheme();

	return (
		<aside className="sidebar">
			{queries
				.filter((query) => query.type.includes(type))
				.map((query, i) => (
					<div className="sidebar__section" key={i}>
						<Tippy
							content={query.description}
							theme={currentMode}
							arrow={false}
							placement={'bottom'}
						>
							<div className="sidebar__section__title">{query.title}</div>
						</Tippy>
						<div className="sidebar__section__options">
							{query.values.map((value, index) => (
								<Tippy
									content={query.valuesDescription[index]}
									theme={currentMode}
									arrow={false}
									key={index}
								>
									<button
										onClick={() => {
											index === query.defaultValue
												? searchParams.delete(query.searchParam)
												: searchParams.set(query.searchParam, value + query.completeParam);
											setSearchParams(searchParams);
										}}
										className={`sidebar__button ${
											searchParams.get(query.searchParam) === value + query.completeParam ||
											(!searchParams.get(query.searchParam) && index === query.defaultValue)
												? 'active'
												: ''
										}`}
									>
										{value[0].toUpperCase() + value.slice(1)}
									</button>
								</Tippy>
							))}
						</div>
					</div>
				))}
			{type === AsideType.GRAPH && (
				<>
					<div className="sidebar__section">
						<Tippy
							content={sizeOptions.description}
							theme={currentMode}
							arrow={false}
							placement={'bottom'}
						>
							<div className="sidebar__section__title">{sizeOptions.title}</div>
						</Tippy>
						<div className="sidebar__section__options">
							{sizeOptions.values.map((value, index: number) => (
								<Tippy
									content={sizeOptions.valuesDescription[index]}
									theme={currentMode}
									arrow={false}
									key={index}
								>
									<button
										onClick={() => {
											setSize && setSize(sizeOptions.actualValues[index]);
										}}
										className={`sidebar__button ${
											size === sizeOptions.actualValues[index] ? 'active' : ''
										}`}
									>
										{value}
									</button>
								</Tippy>
							))}
						</div>
					</div>
					<div className="sidebar__section">
						<div className="sidebar__section__title">{legendOptions.title}</div>
						<div className="sidebar__section__options">
							{legendOptions.values.map((value, index: number) => (
								<button
									onClick={() => {
										setLegend && setLegend(legendOptions.actualValues[index]);
									}}
									className={`sidebar__button ${
										legend === legendOptions.actualValues[index] ? 'active' : ''
									}`}
								>
									{value}
								</button>
							))}
						</div>
					</div>
				</>
			)}
		</aside>
	);
};
export default AsideQueries;
