import { useEffect } from 'react';
import { useSearchParams, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import useAuth from '../hooks/useAuth';
import NotFound from './NotFound';
import TopTracks from './TopTracks';
import TopArtists from './TopArtists';
import TopGenres from './TopGenres';
import Profile from './Profile';
import Home from './Home';
import Login from './Login';

const Main: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const code = searchParams.get('code');
	const { accessToken } = useAuth(code ? code : undefined);

	useEffect(() => {
		if (searchParams.has('code') && accessToken) {
			searchParams.delete('code');
			setSearchParams(searchParams);
		}
	}, [searchParams, accessToken, setSearchParams]);

	return (
		<Routes>
			<Route path="/" element={accessToken ? <Home /> : <Login />} />
			<Route path="/track/top" element={<ProtectedRoute children={<TopTracks />} />} />
			<Route path="/artist/top" element={<ProtectedRoute children={<TopArtists />} />} />
			<Route path="/genre/top" element={<ProtectedRoute children={<TopGenres />} />} />
			<Route path="/profile" element={<ProtectedRoute children={<Profile />} />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Main;
