import React from 'react';

import { Provider } from 'react-redux';

import mockStore from '../../src/models/__mocks__/store';

export const MockReduxDecorator = (Story, context) => {
	const {
		parameters: { redux },
	} = context;

	if (typeof redux === 'undefined') {
		return <Story />;
	}

	const store = mockStore(redux.data);

	return (
		<Provider store={store}>
			<Story />
		</Provider>
	);
};
