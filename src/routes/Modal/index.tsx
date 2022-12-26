import { CustomRoute } from 'util/hook/useRouter';
import DialogRoutes from './Dialog';

const ModalRoutes: CustomRoute = {
	path: '/modals',
	components: () => [],
	render: (_, children) => children,
	onEnter: async ({ next }) => {
		const children = await next();
		return children;
	},
	children: [
		DialogRoutes
	]
};
export default ModalRoutes;
