/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import Visibility from 'images/icon/visibility.inline.svg';
import VisibilityOff from 'images/icon/visibility-off.inline.svg';

import Input, { InputProperty } from '../Input';

import styles from './index.css';

/**
 * 密碼輸入框
 *
 * @param {*} { ...props }
 * @return {*}
 */
const PasswordInput: React.FC<InputProperty> = ({ ...props }) => {

	const [type, setType] = useState<'text' | 'password'>('password');

	const toggleType = () => {
		setType(preType => preType === 'text' ? 'password' : 'text');
	};

	return (
		<div className={styles.passwordInput}>
			<Input {...props} type={type}/>
			{ Visibility &&
				<div
					className={styles.icon}
					onKeyDown={() => {}}
					role="button"
					tabIndex={0}
					onClick={toggleType}
				>
					{type === 'text' ? <Visibility /> : <VisibilityOff />}
				</div>
			}
		</div>
	);
};

export default PasswordInput;
