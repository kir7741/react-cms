import { Dispatch } from 'redux';
import { handleActions, createAction, Action } from 'redux-actions';
import { User } from 'types/interfaces/user';
import { useRedux } from 'util/hook/redux';

import { State as GlobalState } from './reducers';
import { pushRoute } from './routing';

/**
 * 此 hook 的狀態介面
 * for global state use
 *
 * @export
 * @interface State
 */
export interface State {

	/**
	 * 使用者資訊
	 *
	 * @type {User}
	 * @memberof State
	 */
	userInfo: User

}

const initialState: State = {
	userInfo: {
		id: -1,
		account: '',
		telPhone: '',
		mobilePhone: ''
	}
};

const getUserInfo = createAction('GET_USER_INFO', async () => {

	const getUser = new Promise<User>(resolve => {
		setTimeout(() => {
			resolve({
				id: 0,
				account: 'Joseph',
				telPhone: '0212345678',
				mobilePhone: '0912345678'
			});
		}, 500);
	})

	const user = await getUser;

	return user;

});

const login = createAction('LOGIN', () => async (dispatch: Dispatch) => {
	await dispatch(getUserInfo());
	dispatch(pushRoute('/'));
});

export const reducer = {
	user: handleActions(
		{
			GET_USER_INFO_FULFILLED: (state, action: Action<User>) => ({
				...state,
				userInfo: action.payload
			}),
		},
		initialState
	)
};

const userSelector = (state: GlobalState) => ({
	userInfo: state.user.userInfo
});

// const userSelector = createSelector(
// 	(state: GlobalState) => state.user,
// 	user => user.userInfo
// );

const userActionsMap = {
	/**
	 * 取得使用者資訊
	 */
	getUserInfo,

	/**
	 * 登入
	 */
	login
};

type UserSelector = ReturnType<typeof userSelector>;
type UserActionsMap = typeof userActionsMap;

export const useUser = () =>
	useRedux<UserSelector, UserActionsMap>(userSelector, userActionsMap);
