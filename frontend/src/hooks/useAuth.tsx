import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { resetAuth, setAuth } from '../features/auth/authSlice';
import { fetchAuth, refetchAuth } from '../utils/authApi';
import { dateToString, stringToDate } from '../utils/dateHandler';

const useAuth = (code?: string): { accessToken: string } => {
	const dispatch = useDispatch();
	const { accessToken, refreshToken, expiresIn, expiresAt } = useSelector(
		(state: RootState) => state.auth
	);

	const { data, isSuccess } = useQuery('login', () => fetchAuth(code ? code : ''), {
		enabled: code ? true : false,
	});

	useEffect(() => {
		if (code && isSuccess) {
			var now = new Date();
			now.setSeconds(now.getSeconds() + parseInt(data.expiresIn) - 60);
			data['expiresAt'] = dateToString(now);
			dispatch(setAuth(data));
		}
	}, [code, data, isSuccess, dispatch]);

	useEffect(() => {
		if (!refreshToken || !expiresIn || !expiresAt) return;
		const refreshAccess = async () => {
			const response = await refetchAuth(refreshToken);
			if (response) {
				var now = new Date();
				now.setSeconds(now.getSeconds() + parseInt(response.expiresIn) - 60);
				response['expiresAt'] = dateToString(now);
				dispatch(setAuth(response));
			} else {
				dispatch(resetAuth());
			}
		};
		if (new Date() > stringToDate(expiresAt) || accessToken === '401') refreshAccess();
	}, [expiresIn, expiresAt, refreshToken, dispatch, accessToken]);

	return { accessToken };
};

export default useAuth;
