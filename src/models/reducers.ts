import { combineReducers } from 'redux';

import * as routing from './routing';
import * as members from './member';
import * as blogs from './blog';
import * as user from './user';

// For Global State interface
export interface State {
	blogs: blogs.State;
	members: members.State;
	routing: routing.State;
	user: user.State
}

const reducers = combineReducers<State>({
	...routing.reducer,
	...members.reducer,
	...blogs.reducer,
	...user.reducer
});

export default reducers;
