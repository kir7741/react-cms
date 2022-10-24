import React, { FormEvent } from 'react';
import classnames from 'classnames';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import PasswordInput from 'components/atoms/PasswordInput';

import { useUser } from 'models/user';
import { FormControl, FormControlBase } from 'types/interfaces/form-control';
import { ValidatorType } from 'types/enum/validator-type';
import { Validators } from 'util/validator-fn';

import useForm from 'util/hook/useForm';
import styles from './index.css';

interface LoginInput {
	account: FormControl<string>;
	pwd: FormControl<string>;
}

/**
 * 登入頁面
 *
 * @returns
 */
const Login: React.FC = () => {

	const [, { login }] = useUser();
	const [
		{ form },
		{ setCtrlValue, updateCtrlValidity, updateValidity, getCtrlErrorMsg }
	] = useForm<FormControlBase<LoginInput>>({
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
	});

	const clickLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isValid = updateValidity();
		if (isValid) {
			login();
		}
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
					errorMsg={getCtrlErrorMsg('account')}
					updateCtrlValidity={() => updateCtrlValidity('account')}
					onChangeValue={val => setCtrlValue('account', val)}
				/>
				<PasswordInput
					placeholder='密碼'
					value={form.pwd.value}
					validOnBlur
					errorMsg={getCtrlErrorMsg('pwd')}
					updateCtrlValidity={() => updateCtrlValidity('pwd')}
					onChangeValue={val => setCtrlValue('pwd', val)}
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
