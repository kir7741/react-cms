import { CustomRoute } from 'util/hook/useRouter';

import MembersRoute from './Members';
import BlogsRoute from './Blogs';
import DashboardRoute from './Dashboard';
import LoginRoutes from './Login';
import { storeUserInfo } from '../models/user';
import { User } from '../types/interfaces/user';

let hasBeenInit = false;

const routes: CustomRoute = {
	path: '/',
	components: () => [],
	render: (_, children) => children,
	onEnter: async ({ next, store }) => {

		if (!hasBeenInit) {
			const user = JSON.parse(sessionStorage.getItem('user') || '') as User;
			if (
				user &&
				user.id > -1
			) {
				store.dispatch(storeUserInfo(user));
			}
			hasBeenInit = true;
		}

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
