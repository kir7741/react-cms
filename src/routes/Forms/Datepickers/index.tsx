import React from 'react';
import { CustomRoute } from 'util/hook/useRouter';

const DatepickersRoutes: CustomRoute = {
	path: '/datepickers',
	components: () => [import(/* webpackChunkName: 'datePickers' */ './component')],
	render: ([Datepickers]) => <Datepickers />,
	onEnter: async ({ next }) => {
		const children = await next();
		return children;
	}
};
export default DatepickersRoutes;
