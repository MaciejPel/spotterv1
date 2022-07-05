import { authURL } from '../utils/spotifyApi';

const Login: React.FC = () => {
	document.title = 'Login | Spotter';
	return (
		<div className="login">
			<a className="login__button" href={authURL}>
				Login with Spotify
			</a>
		</div>
	);
};
export default Login;
