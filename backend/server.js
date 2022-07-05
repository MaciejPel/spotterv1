const path = require('path');
const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.ENVIRONMENT === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/build')));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
	);
} else {
	app.get('/', (req, res) => res.send('Please set to production'));
}

app.post('/refresh', (req, res) => {
	const refreshToken = req.body.refreshToken;
	const spotifyApi = new SpotifyWebApi({
		redirectUri:
			process.env.ENVIRONMENT === 'production'
				? process.env.REDIRECT_URI_PROD
				: process.env.REDIRECT_URI_DEV,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		refreshToken,
	});

	spotifyApi
		.refreshAccessToken()
		.then((data) => {
			res.json({
				accessToken: data.body.access_token,
				expiresIn: data.body.expires_in,
			});
		})
		.catch((err) => {
			console.log(err.message);
			res.sendStatus(400);
		});
});

app.post('/login', (req, res) => {
	const code = req.body.code;
	const spotifyApi = new SpotifyWebApi({
		redirectUri:
			process.env.ENVIRONMENT === 'development'
				? process.env.REDIRECT_URI_DEV
				: process.env.REDIRECT_URI_PROD,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
	});

	spotifyApi
		.authorizationCodeGrant(code)
		.then((data) => {
			res.json({
				accessToken: data.body.access_token,
				refreshToken: data.body.refresh_token,
				expiresIn: data.body.expires_in,
			});
		})
		.catch((err) => {
			console.log(err.message);
			res.sendStatus(400);
		});
});

app.listen(process.env.PORT || 5000);
