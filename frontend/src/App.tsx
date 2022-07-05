import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import useAuth from './hooks/useAuth';
import useTheme from './hooks/useTheme';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import TopTracks from './pages/TopTracks';
import TopArtists from './pages/TopArtists';
import TopGenres from './pages/TopGenres';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Login from './pages/Login';
import './styles/css/App.css';

const App: React.FC = () => {
	const { accessToken } = useAuth();
	const { currentMode } = useTheme();

	return (
		<BrowserRouter>
			<div className={currentMode}>
				<Navbar />
				<Routes>
					<Route path="/" element={accessToken ? <Home /> : <Login />} />
					<Route path="/track/top" element={<ProtectedRoute children={<TopTracks />} />} />
					<Route path="/artist/top" element={<ProtectedRoute children={<TopArtists />} />} />
					<Route path="/genre/top" element={<ProtectedRoute children={<TopGenres />} />} />
					<Route path="/profile" element={<ProtectedRoute children={<Profile />} />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
