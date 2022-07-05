import Main from './pages/Main';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import useTheme from './hooks/useTheme';
import './styles/css/App.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
	const { currentMode } = useTheme();

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<div className={currentMode}>
					<Navbar />
					<Main />
				</div>
			</BrowserRouter>
		</QueryClientProvider>
	);
};

export default App;
