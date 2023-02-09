import React, { useState } from 'react';
import Modal from 'components/molecules/Modal';
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { useModal } from 'models/modal';
import styles from './index.module.css';

interface DialogProperty { }

const Dialog: React.FC<DialogProperty> = () => {
	const [{ modalList }, { openModal, }] = useModal();
	const [uuId] = useState(uuidv4());

	return (
		<>
			<div
				role="button"
				tabIndex={0}
				onKeyPress={() => {}}
				onClick={() => {
					openModal({
						message: 'messageTest',
						uuId
					})
				}}
			>
				click me!
			</div>

			<Modal uuId={uuId}/>
		</>
	)
};

export default Dialog;
