import { useSearchParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { authURL } from '../utils/spotifyApi';

const Login: React.FC = () => {
	document.title = 'Login | Spotter';

	const [searchParams] = useSearchParams();
	const code = searchParams.get('code');
	useAuth(code ? code : '');

	return (
		<div className="login">
			<a className="login__button" href={authURL}>
				Login with Spotify
			</a>
		</div>
	);
};
export default Login;
