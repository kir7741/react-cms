import { createAction, handleActions } from 'redux-actions';
import { createContext, useContext } from 'react';
import { Location, History } from 'history';
import qs from 'qs';
import { createSelector } from 'reselect';
import history from 'store/history';
import { useRedux } from 'util/hook/redux';
import { State as GlobalState } from './reducers';

export const pushRoute = createAction(
	'PUSH_ROUTE',
	(pathname: string, params?: Record<string, unknown>): void => {
		if (!params) {
			history.push(pathname);
			return;
		}
		const path = pathname.split('?')[0];
		const paramsInPathname = pathname.split('?')[1] ? pathname.split('?')[1] : '';
		const toSetParams = {
			...qs.parse(paramsInPathname),
			...params,
		};
		history.push(`${path}?${qs.stringify(toSetParams)}`);
	},
);

export const routeChange = createAction<Location, Location>(
	'ROUTE_LOCATION_CHANGE',
	(location: Location) => location,
);

export type State = Location;

export const defaultState: State = { ...history.location };

export const reducer = {
	routing: handleActions<Location, Location>(
		{
			ROUTE_LOCATION_CHANGE: (state, action) => ({
				...state,
				...action.payload,
			}),
		},
		defaultState,
	),
};

export const HistoryContext = createContext<History>(history);

export const useHistory = (): History => useContext(HistoryContext);

const routeSelector = createSelector(
	(state: GlobalState) => state.routing,
	routing => routing,
);

const routeActionsMap = { pushRoute };

type RouteSelector = ReturnType<typeof routeSelector>;
type RouteActionsMap = typeof routeActionsMap;

export const useRouting = () =>
	useRedux<RouteSelector, RouteActionsMap>(routeSelector, routeActionsMap);
