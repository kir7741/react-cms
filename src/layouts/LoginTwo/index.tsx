import React, { FormEvent } from 'react';
import classnames from 'classnames';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import PasswordInput from 'components/atoms/PasswordInput';

import { useLoginForm } from 'models/loginForm';

import { getCtrlErrorMsg } from 'util/form-operators';

import styles from './index.module.css';

/**
 * 登入頁面
 *
 * @returns
 */
const Login: React.FC = () => {

	const [{ form }, { setFormCtrlValue, updateFormCtrlValidity, login }] = useLoginForm();
	// const [
	// 	{ form },
	// 	{ setCtrlValue, updateCtrlValidity, updateValidity, getCtrlErrorMsg }
	// ] = useForm<FormControlBase<LoginInput>>({
	// 	account: {
	// 		value: '',
	// 		errors: null,
	// 		options: {
	// 			validators: [
	// 				ValidatorType.REQUIRED
	// 			]
	// 		}
	// 	},
	// 	pwd: {
	// 		value: '',
	// 		errors: null,
	// 		options: {
	// 			validators: [
	// 				ValidatorType.REQUIRED,
	// 				Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
	// 			]
	// 		}
	// 	},
	// });

	const clickLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		login();
	};

	return (
		<div className={classnames(styles.login)}>
			<form
				className={classnames(styles.box)}
				onSubmit={clickLogin}
			>
				<div className={classnames(styles.logo)}>Logo</div>
				<Input
					type="text"
					placeholder='帳號'
					value={form.account.value}
					validOnBlur
					errorMsg={getCtrlErrorMsg(form.account.errors)}
					updateCtrlValidity={() => updateFormCtrlValidity('account')}
					onChangeValue={val => setFormCtrlValue('account', val)}
				/>
				<PasswordInput
					placeholder='密碼'
					value={form.pwd.value}
					validOnBlur
					errorMsg={getCtrlErrorMsg(form.pwd.errors)}
					updateCtrlValidity={() => updateFormCtrlValidity('pwd')}
					onChangeValue={val => setFormCtrlValue('pwd', val)}
				/>
				<Button
					type="submit"
					text="登入"
					className={classnames(styles.loginBtn)}
				/>
			</form>
		</div>
	);

};

export default Login;

