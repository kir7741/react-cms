import React from 'react';
import { CustomRoute } from 'util/hook/useRouter';

const DashboardRoute: CustomRoute = {
	path: '',
	components: () => [import(/* webpackChunkName: 'home' */ './component')],
	render: ([Dashboard]) => <Dashboard />,
	onEnter: async ({ next, store, history }) => {
		const {
			user: { userInfo }
		} = store.getState();

		if (userInfo.id < 0) {
			history.replace('/login');
		}

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		const children = await next();
		return children;
	},
};

export default DashboardRoute;
