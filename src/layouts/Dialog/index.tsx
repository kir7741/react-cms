import React, { useState } from 'react';
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { useModal } from 'models/modal';
import Modal from 'components/molecules/Modal';
import Dialog from 'components/molecules/Dialog';

import styles from './index.module.css';


interface DialogProperty { }

const DialogPage: React.FC<DialogProperty> = () => {
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

			<Dialog uuId={uuId}/>
		</>
	)
};

export default DialogPage;
