import 'whatwg-fetch';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// A modern alternative to CSS resets
import 'normalize.css';
// Global css setting
import './global.css';
import './grid.css';

import Router from 'layouts/Router';

import { defaultState } from 'models/reducers';
import configureStore from 'store';
import history from 'store/history';
import routes from 'routes';

const store = configureStore(defaultState);

const rootElement = document.getElementById('content');

if (rootElement !== null) {
	const root = createRoot(rootElement);

	root.render(
		<Provider store={store}>
			<Router history={history} routes={routes} store={store} />
		</Provider>,
	);
}
