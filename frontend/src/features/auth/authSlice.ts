import { createSlice } from '@reduxjs/toolkit';

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
const expiresIn = localStorage.getItem('expiresIn');
const expiresAt = localStorage.getItem('expiresAt');

const initialState: {
	accessToken: string;
	refreshToken: string;
	expiresIn: string;
	expiresAt: string;
} = {
	accessToken: accessToken ? accessToken : '',
	refreshToken: refreshToken ? refreshToken : '',
	expiresIn: expiresIn ? expiresIn : '',
	expiresAt: expiresAt ? expiresAt : '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			action.payload.accessToken && localStorage.setItem('accessToken', action.payload.accessToken);
			action.payload.refreshToken &&
				localStorage.setItem('refreshToken', action.payload.refreshToken);
			action.payload.expiresIn && localStorage.setItem('expiresIn', action.payload.expiresIn);
			action.payload.expiresAt && localStorage.setItem('expiresAt', action.payload.expiresAt);
			if (action.payload.accessToken) state.accessToken = action.payload.accessToken;
			if (action.payload.refreshToken) state.refreshToken = action.payload.refreshToken;
			if (action.payload.expiresIn) state.expiresIn = action.payload.expiresIn;
			if (action.payload.expiresAt) state.expiresAt = action.payload.expiresAt;
		},
		resetAuth: (state) => {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('expiresIn');
			localStorage.removeItem('expiresAt');
			state.accessToken = '';
			state.refreshToken = '';
			state.expiresIn = '';
			state.expiresAt = '';
		},
	},
});

export const { setAuth, resetAuth } = authSlice.actions;
export default authSlice.reducer;
