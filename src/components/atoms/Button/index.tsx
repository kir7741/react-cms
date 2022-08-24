import React, { InputHTMLAttributes } from 'react';
import classnames from 'classnames';

import { ButtonAppearType } from '../../../types/enum/button-appear-type.enum';

import styles from './index.css';

interface ButtonProperty extends InputHTMLAttributes<HTMLButtonElement> {
	className?: string;
	text: string;
	type: 'button' | 'submit';
	appear?: ButtonAppearType;
	onClick?: () => void;
}

const Button: React.FC<ButtonProperty> = ({
	className,
	text,
	type,
	disabled = false,
	appear = ButtonAppearType.DEFAULT,
	children,
	onClick
}) => (
	<button
	  // eslint-disable-next-line react/button-has-type
		type={type}
		disabled={disabled}
		className={classnames(styles.button, className, {
			[styles.defaultBtn]: appear === ButtonAppearType.DEFAULT
		})}
		onClick={onClick}
	>
		{text}
		{children}
	</button>
);

export default Button;
