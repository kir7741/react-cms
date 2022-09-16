import React, { FormEvent, useCallback } from 'react';
import classnames from 'classnames';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import { useUser } from 'models/user';
import { FormControl } from 'types/interfaces/form-control';
import { ValidatorType } from 'types/enum/validator-type';

import useForm from 'util/hook/useForm';
import styles from './index.css';

interface LoginProperty { }

interface LoginInput {
	account: FormControl<string>;
	pwd: FormControl<string>;
}

/**
 * 登入頁面
 *
 * @returns
 */
const Login: React.FC<LoginProperty> = () => {

	const [, { login }] = useUser();
	const [{ form }, { setCtrlValue, updateCtrlValidity, patchValue, updateValidity, getCtrlErrorMsg }] = useForm<LoginInput>({
		account: {
			value: '',
			errors: null,
			options: {
				validators: [
					ValidatorType.REQUIRED
				]
			}
		},
		pwd: { value: '', errors: null},
	});

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
					errorMsg={getCtrlErrorMsg('account')}
					updateCtrlValidity={() => updateCtrlValidity('account')}
					onChangeValue={val => setCtrlValue('account', val)}
				/>
				{/* <Input
					type="password"
					placeholder='密碼'
					value={form.pwd.value}
					onChangeValue={val => updateCtrlValidity('pwd', val)}
				/> */}
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
