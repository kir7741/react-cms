import React from 'react';
import { CustomRoute } from 'util/hook/useRouter';

const DialogRoutes: CustomRoute = {
	path: '/dialog',
	components: () => [import(/* webpackChunkName: 'members' */ './component')],
	render: ([Dialog]) => <Dialog />,
	onEnter: async ({ next }) => {
		const children = await next();
		return children;
	}
};
export default DialogRoutes;
