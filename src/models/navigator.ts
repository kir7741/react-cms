import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { createAction, handleActions, Action } from 'redux-actions';
import { Menu } from 'types/interfaces/menu';
import { useRedux, WrapActionDispatch } from 'util/hook/redux';

import { State as GlobalState, GetState } from './reducers';

export interface State {
	isOpen: boolean;
	menuList: Menu[];
}

const initialState: State = {
	isOpen: true,
	menuList: []
};

export const openNav = createAction<void>('OPEN_NAV');
export const closeNav = createAction<void>('CLOSE_NAV');
export const toggleNav = createAction('TOGGLE_NAV', () => (_: Dispatch, getState: GetState) => {
	const { navigator: { isOpen } } = getState();
	return !isOpen;
});

export const getMenus = createAction<Menu[]>('GET_MENUS', () => [
	{
		id: uuidv4(),
		name: 'Forms',
		alias: 'forms',
		path: '',
		subMenus: [
			{
				id: uuidv4(),
				name: 'FormsInputs',
				path: '/forms/formsInputs',
				alias: 'formsInputs',
				subMenus: [],
				isOpen: false
			},
			{
				id: uuidv4(),
				name: 'FormsLayouts',
				path: '/forms/formsLayouts',
				alias: 'formsLayouts',
				subMenus: [],
				isOpen: false
			},
			{
				id: uuidv4(),
				name: 'Buttons',
				path: '/forms/buttons',
				alias: 'buttons',
				subMenus: [],
				isOpen: false

			},
			{
				id: uuidv4(),
				name: 'Datepicker',
				path: '/forms/datepicker',
				alias: 'datepicker',
				subMenus: [],
				isOpen: false
			}
		],
		isOpen: false
	},
	{
		id: uuidv4(),
		name: 'Modals',
		alias: 'modals',
		path: '',
		subMenus: [
			{
				id: uuidv4(),
				name: 'Dialog',
				alias: 'dialog',
				path: '/modals/dialog',
				subMenus: [],
				isOpen: false
			},
			{
				id: uuidv4(),
				name: 'Toast',
				path: '/modals/toast',
				alias: 'toast',
				subMenus: [],
				isOpen: false
			},
			{
				id: uuidv4(),
				name: 'Tooltip',
				alias: 'tooltip',
				path: '/modals/tooltip',
				subMenus: [],
				isOpen: false
			},
		],
		isOpen: false
	}
]);

export const reducer = {
	navigator: handleActions<State, any>( // eslint-disable-line @typescript-eslint/no-explicit-any
		{
			OPEN_NAV: state => ({
				...state,
				isOpen: true,
			}),

			CLOSE_NAV: state => ({
				...state,
				isOpen: false,
			}),

			TOGGLE_NAV: (state, action: Action<boolean>) => ({
				...state,
				isOpen: action.payload
			}),

			GET_MENUS: (state, action: Action<Menu[]>) => ({
				...state,
				menuList: action.payload
			}),

		},
		initialState,
	),
};

const navigatorActionsMap = {
	openNav,
	closeNav,
	toggleNav
};

const mapHooksToState = (state: GlobalState) => ({
	isOpen: state.navigator.isOpen,
	menuList: state.navigator.menuList
});

type NavigatorSelector = ReturnType<typeof mapHooksToState>;
type NavigatorActionsMap = typeof navigatorActionsMap;

export const useNavigator = (): [NavigatorSelector, WrapActionDispatch<NavigatorActionsMap>] =>
	useRedux<NavigatorSelector, NavigatorActionsMap>(mapHooksToState, navigatorActionsMap);
