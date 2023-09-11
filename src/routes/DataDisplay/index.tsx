import { CustomRoute } from 'util/hook/useRouter';
import { defaultRedirect } from 'util/utility';
import AccordionsRoutes from './Accordions';

const DataDisplayRoutes: CustomRoute = {
	path: '/dataDisplay',
	components: () => [],
	render: (_, children) => children,
	onEnter: async ({ next, params, store, queries, history }) => {
		const redirectUrl = defaultRedirect(store);
		if (redirectUrl) {
			history.replace(redirectUrl);
			return null;
		}

		const children = await next();
		return children;
	},
	children: [AccordionsRoutes],
};
export default DataDisplayRoutes;
