import { createAction, handleActions, Action } from 'redux-actions';
import { useRedux, WrapActionDispatch } from 'util/hook/redux';

import { State as GlobalState } from './reducers';

interface Blog {
	author: string;
	pID: string;
	thumb_url: string; // eslint-disable-line camelcase
	time: string;
	title: string;
}

interface BlogPayload {
	list: Blog[];
}

export const getBlogs = createAction<Promise<BlogPayload>>('GET_BLOGS', async () => {
	const data = new FormData();

	data.append('num', '10');

	try {
		const posts = await fetch('https://www.25sprout.com/bin/bloglist_2016.php', {
			method: 'POST',
			body: data,
		});
		return posts.json();
	} catch (e) {
		return { list: [] };
	}
});

export const cleanBlogs = createAction('CLEAN_BLOGS');

// For Global State usage
export interface State {
	loading: boolean;
	posts: Blog[];
}

const initialState: State = {
	loading: false,
	posts: [],
};

export const reducer = {
	// Workaround: HandleActions 目前定義無法支援多種 action 形式
	blogs: handleActions<State, any>( // eslint-disable-line @typescript-eslint/no-explicit-any
		{
			GET_BLOGS_PENDING: state => ({
				...state,
				loading: true,
			}),

			GET_BLOGS_FULFILLED: (state, action: Action<BlogPayload>) => ({
				...state,
				posts: action.payload.list,
				loading: false,
			}),

			CLEAN_BLOGS: state => ({
				...state,
				posts: [],
			}),
		},
		initialState,
	),
};

const blogActionsMap = {
	getBlogs,
	cleanBlogs,
};

const mapHooksToState = (state: GlobalState) => ({
	posts: state.blogs.posts,
});

type BlogSelector = ReturnType<typeof mapHooksToState>;
type BlogctionsMap = typeof blogActionsMap;

export const useBlog = (): [BlogSelector, WrapActionDispatch<BlogctionsMap>] =>
	useRedux<BlogSelector, BlogctionsMap>(mapHooksToState, blogActionsMap);
