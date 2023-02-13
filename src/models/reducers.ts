import { combineReducers } from 'redux';

import * as routing from './routing';
import * as navigator from './navigator';
import * as members from './member';
import * as blogs from './blog';
import * as user from './user';
import * as modal from './modal';
import * as loginForm from './loginForm';

// For Global State interface
export interface State {
	blogs: blogs.State;
	members: members.State;
	routing: routing.State;
	navigator: navigator.State;
	user: user.State;
	modal: modal.State;
	loginForm: loginForm.State;
}

export type GetState = () => State;

export const defaultState: State = {
	blogs: blogs.defaultState,
	members: members.defaultState,
	routing: routing.defaultState,
	navigator: navigator.defaultState,
	user: user.defaultState,
	modal: modal.defaultState,
};

const reducers = combineReducers<State>({
	...routing.reducer,
	...navigator.reducer,
	...members.reducer,
	...blogs.reducer,
	...user.reducer,
	...modal.reducer,
	...loginForm.reducer
});

export default reducers;
