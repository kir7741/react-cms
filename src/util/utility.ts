import { Store } from 'redux';
import { State } from 'models/reducers';

export const defaultRedirect = (store: Store<State>) => {

	const {
		routing: { pathname },
		navigator: { menuList }
	} = store.getState();

	const urlTree = (pathname as string).split('/').filter(d => d);
	const activeRoute = menuList.find(menu => menu.alias === urlTree[0]);

	if (urlTree.length === 1) {
		return `${activeRoute?.subMenus[0].path}`;
	}

	if (
		urlTree[1] &&
		!activeRoute?.subMenus.some(route => urlTree[1] === route.alias)
	) {
		return `${activeRoute?.subMenus[0].path}`;
	}

	return '';

}
