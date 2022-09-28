import React from 'react';
import { CustomRoute } from 'util/hook/useRouter';
import FormInputsRoutes from './FormInputs';

const FormsRoutes: CustomRoute = {
	path: '/forms',
	components: () => [],
	render: (_, children) => children,
	onEnter: async ({ next }) => {
		const children = await next();
		return children;
	},
	children: [
		FormInputsRoutes
	]
};
export default FormsRoutes;
