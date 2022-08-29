import { createAction, handleActions } from 'redux-actions';
import { createContext, useContext } from 'react';
import qs from 'qs';
import { Location, History } from 'history';
import { createSelector } from 'reselect';

import { useRedux, WrapActionDispatch } from 'util/hook/redux';
import history from 'store/history';

import { State as GlobalState } from './reducers';

export const pushRoute = createAction(
	'PUSH_ROUTE',
	(pathname: string, params?: Record<string, any>) => {
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
	(location: Location) => ({
		...location,
		queries: {
			...qs.parse(location.search, { ignoreQueryPrefix: true }),
		},
	}),
);

interface RoutingQuery {
	queries: Record<string, unknown>;
}

export type State = Location & RoutingQuery;

export const reducer = {
	routing: handleActions<Location & RoutingQuery, Location & RoutingQuery>(
		{
			ROUTE_LOCATION_CHANGE: (state, action) => ({
				...state,
				...action.payload,
			}),
		},
		{
			...history.location,
			queries: {
				...qs.parse(history.location.search, { ignoreQueryPrefix: true }),
			},
		},
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

export const useRouting = (): [RouteSelector, WrapActionDispatch<RouteActionsMap>] =>
	useRedux<RouteSelector, RouteActionsMap>(routeSelector, routeActionsMap);
