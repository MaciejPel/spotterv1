export const serverUri =
	process.env.REACT_APP_ENVIRONMENT === 'production'
		? process.env.REACT_APP_SERVER_PROD
		: process.env.REACT_APP_SERVER_DEV;

export const fetchAuth = async (code: string) => {
	if (!code) return;
	const res = await fetch(`${serverUri}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ code }),
	});
	return res.json();
};

export const refetchAuth = async (refreshToken: string) => {
	const res = await fetch(`${serverUri}/refresh`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ refreshToken }),
	});
	return res.json();
};
