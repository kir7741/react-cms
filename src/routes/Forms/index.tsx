import { CustomRoute } from 'util/hook/useRouter';
import { defaultRedirect } from 'util/utility';
import DatepickersRoutes from './Datepickers';
import FormInputsRoutes from './FormInputs';

const FormsRoutes: CustomRoute = {
	path: '/forms',
	components: () => [],
	render: (_, children) => children,
	onEnter: async ({ next, params, store, queries, history}) => {

		const redirectUrl = defaultRedirect(store);
		if (redirectUrl) {
			history.replace(redirectUrl);
			return null;
		}

		const children = await next();
		return children;
	},
	children: [
		FormInputsRoutes,
		DatepickersRoutes
	]
};
export default FormsRoutes;
