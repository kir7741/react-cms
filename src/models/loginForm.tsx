import { Dispatch } from "redux";
import { createAction, handleActions } from "redux-actions";

import { useRedux } from "util/hook/redux";
import { Validators } from "util/validator-fn";
import { setCtrlValue } from "util/form-operators";

import { ValidatorType } from "types/enum/validator-type";
import { FormControl } from "types/interfaces/form-control";

import { State as GlobalState, GetState } from './reducers';

export interface State {

	account: FormControl<string>;

	pwd: FormControl<string>;

}

export const defaultState: State = {
	account: {
		value: '',
		errors: null,
		options: {
			validators: [
				ValidatorType.REQUIRED
			]
		}
	},
	pwd: {
		value: '',
		errors: null,
		options: {
			validators: [
				ValidatorType.REQUIRED,
				Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
			]
		}
	},
};

const setLoginFormCtrlValue = <R>createAction<(_: Dispatch, getState: GetState) => Partial<State>, keyof State, R>('LOGIN_FORM_SET_CTRL_VALUE', (ctrlName: keyof State, value: R) => (_: Dispatch, getState: GetState) => {
	const { loginForm: form} = getState();
	return setCtrlValue<State, R>(form, ctrlName, value);
});

export const reducer = {
	loginForm: handleActions<State, any>( // eslint-disable-line @typescript-eslint/no-explicit-any
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
		defaultState,
	),
};

const loginFormSelector = (state: GlobalState) => ({
	form: state.loginForm
});

// type MemberActions = GetMembersAction & CleanMembersAction;

const loginFormActionsMap = {

};

type LoginFormSelector = ReturnType<typeof loginFormSelector>;
type LoginFormActionsMap = typeof loginFormActionsMap;

export const useMember = () =>
	useRedux<LoginFormSelector, LoginFormActionsMap>(loginFormSelector, loginFormActionsMap);
