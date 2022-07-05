import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient();

root.render(
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</Provider>
);
