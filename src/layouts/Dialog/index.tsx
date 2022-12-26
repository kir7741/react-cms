import React from 'react';
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { useModal } from 'models/modal';
import styles from './index.css';

interface DialogProperty { }

const Dialog: React.FC<DialogProperty> = () => {
	const [{ modalList }, { openModal, }] = useModal();

	return (
		<div
			role="button"
			tabIndex={0}
			onKeyPress={() => {}}
			onClick={() => {
				const uuId = uuidv4();
				openModal({
					message: 'messageTest',
					uuId
				})
			}}
		>
			click me Mother Fucker!
		</div>
	)
};

export default Dialog;
