import useTheme from '../hooks/useTheme';
import { BsSun, BsMoon } from 'react-icons/bs';

const Switch: React.FC = () => {
	const { isDark } = useTheme();

	return (
		<div className="toggle">
			<button className="toggle__button">
				{isDark ? <BsMoon size={'24'} /> : <BsSun size={'24'} />}
			</button>
		</div>
	);
};
export default Switch;
