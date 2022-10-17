import React from 'react';
import { CustomRoute } from 'util/hook/useRouter';

const FormInputsRoutes: CustomRoute = {
	path: '/formsInputs',
	components: () => [import(/* webpackChunkName: 'members' */ './component')],
	render: ([FormInputs]) => <FormInputs />,
	onEnter: async ({ next }) => {
		const children = await next();
		return children;
	}
};
export default FormInputsRoutes;
