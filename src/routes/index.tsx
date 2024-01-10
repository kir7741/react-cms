import { CustomRoute } from 'util/hook/useRouter';
import { getItem } from 'util/storage';
import { StorageType } from 'types/enum/storage-type';
import { storageKey } from 'types/constants/storage-key';
import { User } from 'types/interfaces/user';

import { getMenus } from 'models/navigator';
import { storeUserInfo } from '../models/user';

import MembersRoute from './Members';
import BlogsRoute from './Blogs';

import LoginRoutes from './Login';
import FormsRoutes from './Forms';
import ModalRoutes from './Modal';
import DataDisplayRoutes from './DataDisplay';

let hasBeenInit = false;

const routes: CustomRoute = {
	path: '/',
	components: () => [],
	render: (_, children) => children,
	onEnter: async ({ next, store }) => {

		if (!hasBeenInit) {
			const user = getItem<User>(storageKey.user, StorageType.SESSION);
			if (
				user &&
				user.id > -1
			) {
				store.dispatch(storeUserInfo(user));
			}
			store.dispatch(getMenus());
			hasBeenInit = true;
		}

		console.log('on Enter Root');
		const children = await next();
		console.log('on Enter Root / end');

		return children;
	},
	children: [
		LoginRoutes,
		MembersRoute,
		BlogsRoute,
		FormsRoutes,
		ModalRoutes,
		DataDisplayRoutes,
	],
};

export default routes;
