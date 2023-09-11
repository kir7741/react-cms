import React from 'react';
import { CustomRoute } from 'util/hook/useRouter';

const LoginRoutes: CustomRoute = {
	path: '/login',
	components: () => [import(/* webpackChunkName: 'login' */ './component')],
	render: ([Login]) => <Login />,
	onEnter: async ({ next }) => {
		const children = await next();
		return children;
	},
};
export default LoginRoutes;
