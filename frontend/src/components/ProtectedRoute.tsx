import { Navigate } from 'react-router-dom';
import { ParentCompProps } from '../types/types';
import useAuth from '../hooks/useAuth';

export const ProtectedRoute = ({ children }: ParentCompProps) => {
	const { accessToken } = useAuth();

	if (!accessToken) {
		return <Navigate to="/" />;
	}

	return children;
};
