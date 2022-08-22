import { createAction, handleActions, Action } from 'redux-actions';
import { useRedux, WrapActionDispatch } from 'util/hook/redux';

import { wrapFetch } from 'util/api';

import { State as GlobalState } from './reducers';

interface Staff {
	no: string;
	name: string;
	fullname: string;
	nickname: string;
	type: string;
	OnBoardDate: string;
	email: string;
	github: string;
	website: string;
	sexual: string;
	birthday: string;
	pic: {
		small: string;
		large: string;
	};
	title: string[];
}

interface MemberPayload {
	staffs: { [props: string]: Staff };
}

export const getMembers = createAction<Promise<MemberPayload>>('GET_MEMBERS', async () => {
	try {
		const data = await wrapFetch<MemberPayload>('avatar/apo/25sproutMember.php');
		return data;
	} catch (error) {
		return { staffs: {} };
	}
});

export const cleanMembers = createAction('CLEAN_MEMBERS');

// For Global State usage
export interface State {
	loading: boolean;
	staffs: { [props: string]: Staff };
}

const initialState: State = {
	loading: false,
	staffs: {},
};

export const reducer = {
	members: handleActions<State, any>( // eslint-disable-line @typescript-eslint/no-explicit-any
		{
			GET_MEMBERS_PENDING: state => ({
				...state,
				loading: true,
			}),

			GET_MEMBERS_FULFILLED: (state, action: Action<MemberPayload>) => ({
				...state,
				staffs: action.payload.staffs,
				loading: false,
			}),

			CLEAN_MEMBERS: state => ({
				...state,
				staffs: {},
			}),
		},
		initialState,
	),
};

const mapHooksToState = (state: GlobalState): { members: { [props: string]: Staff } } => ({
	members: state.members.staffs,
});

// type MemberActions = GetMembersAction & CleanMembersAction;

const memberActionsMap = {
	getMembers,
	cleanMembers,
};

type MemberSelector = ReturnType<typeof mapHooksToState>;
type MemberActionsMap = typeof memberActionsMap;

export const useMember = (): [MemberSelector, WrapActionDispatch<MemberActionsMap>] =>
	useRedux<MemberSelector, MemberActionsMap>(mapHooksToState, memberActionsMap);
