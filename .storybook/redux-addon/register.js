import React from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';

import { useParameter } from '@storybook/api';

const ADDON_ID = 'redux';
const PANEL_ID = `${ADDON_ID}/panel`;
const PARAM_KEY = ADDON_ID;

const MyPanel = () => {
	const value = useParameter(PARAM_KEY, null);

	return (
		<div style={{ whiteSpace: 'pre' }}>
			{value ? JSON.stringify(value.data, null, '\t') : 'No story parameter defined'}
		</div>
	);
};

addons.register(ADDON_ID, () => {
	addons.add(PANEL_ID, {
		type: types.PANEL,
		title: 'Redux',
		render: ({ active, key }) => (
			<AddonPanel active={active} key={key}>
				<MyPanel />
			</AddonPanel>
		),
		paramKey: PARAM_KEY,
	});
});
