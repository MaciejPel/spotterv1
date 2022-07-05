import { store } from '../app/store';
import { setAuth } from '../features/auth/authSlice';

const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri =
	process.env.REACT_APP_ENVIRONMENT === 'production'
		? process.env.REACT_APP_REDIRECT_URI_PROD
		: process.env.REACT_APP_REDIRECT_URI_DEV;
const scopes = [
	'streaming',
	'user-top-read',
	'user-read-email',
	'user-read-private',
	'user-library-read',
	'user-library-modify',
	'user-read-playback-state',
	'user-modify-playback-state',
];

export const authURL = `${authEndpoint}client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
	'%20'
)}`;

const spotifyEndpoint = 'https://api.spotify.com/v1';

export const fetchSpotifyAPI = async (query: string, accessToken: string) => {
	try {
		const response = await fetch(`${spotifyEndpoint}${query}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		if (!response.ok) throw new Error(response.status.toString());
		if (response.status === 204) return false;
		return response.json();
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === '401') {
				store.dispatch(setAuth({ accessToken: '401' }));
			} else {
				throw new Error(`Problem has occured: ${error.message}`);
			}
		}
	}
};
