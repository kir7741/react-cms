/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */

import webpack from 'webpack';
import express from 'express';
import history from 'connect-history-api-fallback';
import httpProxy from 'http-proxy';

import {
	HOST_MAP,
	API_ENDPOINT,
	SELF_HOST_ENDPOINT,
	API_ENDPOINT_DEV_PORT,
	SELF_HOST_ENDPOINT_DEV_PORT,
} from './config/endpoint';

import config from './webpack.config';

const host = HOST_MAP[process.env.PROXY];

const app = express();
const compiler = webpack(config);

app.use(history());

app.use(
	require('webpack-dev-middleware')(compiler, {
		publicPath: config.output.publicPath,
		stats: {
			chunks: false,
			colors: true,
		},
	}),
);

app.use(require('webpack-hot-middleware')(compiler));

app.listen(SELF_HOST_ENDPOINT_DEV_PORT, err => {
	if (err) {
		return console.error(err);
	}

	const proxyServer = httpProxy.createProxyServer({
		target: host,
		changeOrigin: true,
	});

	proxyServer.on('proxyReq', proxyReq => {
		proxyReq.setHeader('Origin', host);
	});

	proxyServer.on('proxyRes', proxyRes => {
		proxyRes.headers['Access-Control-Allow-Headers'] = 'content-type, authorization';
		proxyRes.headers['Access-Control-Allow-Methods'] = 'PUT, POST, GET, DELETE';
		proxyRes.headers['Access-Control-Allow-Origin'] = SELF_HOST_ENDPOINT;
	});

	console.log(`Proxy ${process.env.PROXY} server ${host} start at ${API_ENDPOINT}`);

	proxyServer.listen(API_ENDPOINT_DEV_PORT);

	return console.log(`Listening at ${SELF_HOST_ENDPOINT}/`);
});
