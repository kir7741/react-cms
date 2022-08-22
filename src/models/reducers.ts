import { combineReducers } from 'redux';

import * as routing from './routing';
import * as members from './member';
import * as blogs from './blog';

// For Global State interface
export interface State {
	blogs: blogs.State;
	members: members.State;
	routing: routing.State;
}

const reducers = combineReducers<State>({
	...routing.reducer,
	...members.reducer,
	...blogs.reducer,
});

export default reducers;
