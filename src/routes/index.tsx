import React from 'react';

import { CustomRoute } from 'util/hook/useRouter';

import MembersRoute from './Members';
import BlogsRoute from './Blogs';
import DashboardRoute from './Dashboard';
import LoginRoutes from './Login';

const routes: CustomRoute = {
	path: '/',
	components: () => [],
	render: (_, children) => children,
	onEnter: async ({ next }) => {
		console.log('on Enter Root');
		const children = await next();
		console.log('on Enter Root / end');

		return children;
	},
	children: [
		DashboardRoute, 
		LoginRoutes,
		MembersRoute, 
		BlogsRoute
	],
};

export default routes;
