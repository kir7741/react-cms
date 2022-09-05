import React, { FormEvent } from 'react';
import classnames from 'classnames';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import { FormControl } from 'types/interfaces/form-control';

import { useUser } from 'models/user';

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
	const [{ form }, { setValue }] = useForm<LoginInput>({
		account: { value: '', errors: null},
		pwd: { value: '', errors: null},
	});

	const clickLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		login();
	}

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
					onChangeValue={
						formCtrl => setValue('account', formCtrl)
					}
				/>
				<Input
					type="password"
					placeholder='密碼'
					value={form.pwd.value}
					onChangeValue={
						formCtrl => setValue('pwd', formCtrl)
					}
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
