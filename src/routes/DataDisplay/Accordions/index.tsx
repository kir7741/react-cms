import React from 'react';
import { CustomRoute } from 'util/hook/useRouter';

const AccordionsRoutes: CustomRoute = {
	path: '/accordions',
	components: () => [import(/* webpackChunkName: 'accordions' */ './component')],
	render: ([Accordions]) => <Accordions />,
	onEnter: async ({ next }) => {
		const children = await next();
		return children;
	}
};
export default AccordionsRoutes;
