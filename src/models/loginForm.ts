import { Dispatch } from "redux";
import { Action, createAction, handleActions } from "redux-actions";

import { useRedux } from "util/hook/redux";
import { Validators } from "util/validator-fn";
import { isFormValid, setCtrlValue, updateCtrlValidity } from "util/form-operators";

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

const setFormCtrlValue = createAction('LOGIN_FORM_SET_CTRL_VALUE', <R>(ctrlName: keyof State, value: R) => (_: Dispatch, getState: GetState) => {
	const { loginForm: form} = getState();
	return setCtrlValue<State, R>(form, ctrlName, value);
});

const updateFormCtrlValidity = createAction('LOGIN_FORM_UPDATE_CTRL_VALIDITY', (ctrlName: keyof State) => (_: Dispatch, getState: GetState) => {
	const { loginForm: form} = getState();
	return updateCtrlValidity<State>(form, ctrlName);
});


// const updateValidity = (): boolean => {

// 	let isValid = true;

// 	Object
// 		.keys(form)
// 		.forEach(k => {
// 			const errors = updateCtrlValidity(k as keyof T);
// 			if (errors) {
// 				isValid = false;
// 			}
// 		});

// 	return isValid;

// };

const login = createAction('CLICK_LOGIN', () => (_: Dispatch, getState: GetState) => {
	const { loginForm: form} = getState();
	const isValid = isFormValid(form);
	if (isValid) {
		// login();
	} else {
		// 檢核所有欄位
	}
})

export const reducer = {
	loginForm: handleActions<State, any>( // eslint-disable-line @typescript-eslint/no-explicit-any
		{
			LOGIN_FORM_SET_CTRL_VALUE: (state, action: Action<Partial<State>>) => ({
				...state,
				...action.payload
			}),
			LOGIN_FORM_UPDATE_CTRL_VALIDITY: (state, action: Action<Partial<State>>) => ({
				...state,
				...action.payload
			}),
		},
		defaultState,
	),
};

const loginFormSelector = (state: GlobalState) => ({
	form: state.loginForm
});

const loginFormActionsMap = {
	setFormCtrlValue,
	updateFormCtrlValidity,
	login
};

type LoginFormSelector = ReturnType<typeof loginFormSelector>;
type LoginFormActionsMap = typeof loginFormActionsMap;

export const useLoginForm = () =>
	useRedux<LoginFormSelector, LoginFormActionsMap>(loginFormSelector, loginFormActionsMap);
