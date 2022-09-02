import React, { FormEvent } from 'react';
import classnames from 'classnames';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';

import { useUser } from 'models/user';

import useForm from 'util/hook/useForm';

import styles from './index.css';

interface LoginProperty { }

interface LoginInput {
	account: string;
	pwd: string;
}


/**
 * 登入頁面
 *
 * @returns
 */
const Login: React.FC<LoginProperty> = () => {

	const [, { login }] = useUser();
	const [{ form }, { setValue }] = useForm<LoginInput>({
		account: '',
		pwd: ''
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
					value={form.account}
					onChangeValue={val => setValue('account', val)}
				/>
				<Input
					type="password"
					value={form.pwd}
					onChangeValue={val => setValue('pwd', val)}
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
