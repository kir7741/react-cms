import React, { FormEvent } from 'react';
import classnames from 'classnames';

import Button from 'components/atoms/Button';

import styles from './index.css';

interface LoginProperty { }

const Login: React.FC<LoginProperty> = () => {

	const clickLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('a');
	}

	return (
		<div className={classnames(styles.login)}>
			<form
				className={classnames(styles.box)}
				onSubmit={clickLogin}
			>
				<div className={classnames(styles.logo)}>Logo</div>
				<div>
					<input type="text" />
				</div>
				<div>
					<input type="text" />
				</div>
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
