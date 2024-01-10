import { Dispatch } from 'redux';
import { handleActions, createAction, Action } from 'redux-actions';
import { storageKey } from 'types/constants/storage-key';
import { StorageType } from 'types/enum/storage-type';
import { User } from 'types/interfaces/user';
import { useRedux } from 'util/hook/redux';
import { setItem } from 'util/storage';

import { GetState, State as GlobalState } from './reducers';
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

export const defaultState: State = {
	userInfo: {
		id: -1,
		account: '',
		telPhone: '',
		mobilePhone: ''
	}
};

/**
 * 儲存使用者資訊
 */
export const storeUserInfo = createAction('STORE_USER_INFO', (user: User) => {
	setItem(storageKey.user, StorageType.SESSION, user);
	return user;
});

/**
 * 登入 api
 */
const login = createAction('LOGIN', () => async (dispatch: Dispatch, getState: GetState) => {
	const getUser = new Promise<User>(resolve => {
		setTimeout(() => {
			resolve({
				id: 0,
				account: 'Joseph',
				telPhone: '0212345678',
				mobilePhone: '0912345678'
			})
			// reject(new Error('error'));
		}, 500);
	})

	try {
		const user = await getUser;
		dispatch(storeUserInfo(user));
	} catch(e) {
		dispatch(storeUserInfo({ ...defaultState.userInfo }));
	}

	const {
		user: {
			userInfo
		}
	} = getState();

	if (userInfo.id > -1) {
		dispatch(pushRoute('/'));
	}

});

export const reducer = {
	user: handleActions(
		{
			STORE_USER_INFO: (state, action: Action<User>) => ({
				...state,
				userInfo: action.payload
			})
		},
		defaultState
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
	storeUserInfo,

	/**
	 * 登入
	 */
	login
};

type UserSelector = ReturnType<typeof userSelector>;
type UserActionsMap = typeof userActionsMap;

export const useUser = () =>
	useRedux<UserSelector, UserActionsMap>(userSelector, userActionsMap);
