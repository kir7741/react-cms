import React from 'react';
import { CustomRoute } from 'util/hook/useRouter';

const DashboardRoute: CustomRoute = {
	path: '',
	components: () => [import(/* webpackChunkName: 'home' */ './component')],
	render: ([Dashboard]) => <Dashboard />,
	onEnter: async ({ next }) => {
		const children = await next();
		return children;
	},
};

export default DashboardRoute;
