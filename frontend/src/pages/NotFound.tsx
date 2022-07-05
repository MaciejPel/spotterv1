import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
	document.title = 'Not Found | Spotter';
	return (
		<div className="notfound">
			<div className="notfound__message">Looks like this site does not exist 🤔</div>
			<button className="notfound__button">
				<Link to="/">Take me Home 🏠</Link>
			</button>
		</div>
	);
};

export default NotFound;
