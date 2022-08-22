import React from 'react';
import classnames from 'classnames';

import styles from './index.css';

interface LoginProperty { }

const Login: React.FC<LoginProperty> = () => (
	<div className={classnames(styles.login)}>
		<div className={classnames(styles.box)}>
			<div className={classnames(styles.logo)}>Logo</div>
			<div>
				<input type="text" />
			</div>
			<div>
				<input type="text" />
			</div>
			<button>
				登入
			</button>
		</div>
	</div>
);

export default Login;
