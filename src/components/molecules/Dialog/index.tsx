import React, { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

import classnames from 'classnames';

import { useModal } from 'models/modal';
import Modal from '../Modal';

import styles from './index.module.css';

interface DialogProperty {
	className?: string;

	uuId: string;

	/**
	 * Dialog header
	 *
	 * @type {React.ReactNode}
	 * @memberof DialogProperty
	 */
	header?: React.ReactNode;

	/**
	 * Dialog footer
	 *
	 * @type {React.ReactNode}
	 * @memberof DialogProperty
	 */
	footer?: React.ReactNode;
}

const Dialog: React.FC<DialogProperty> = ({
	className,
	uuId,
	header = 'header',
	footer = 'footer',
}) => {
	const [{ modalList }, { closeModal }] = useModal();
	const modalData = modalList.find(d => d.uuId === uuId);
	let modalRoot = document.getElementById('modal-root');

	useLayoutEffect(() => {
		if (modalRoot === null) {
			modalRoot = document.createElement('div');
			modalRoot.setAttribute('id', 'modal-root');
			document.body.appendChild(modalRoot);
		}
	}, []);

	// if (!modalData || !uuId) {
	// 	return null;
	// }

	return (
		<Modal isOpen={!!(modalData && uuId)}>
			<div className={classnames(styles.dialogHeader)}>
				{header}
				<div
					role="button"
					tabIndex={0}
					className={classnames(styles.closeBtn)}
					onKeyDown={() => {}}
					onClick={() => closeModal(uuId)}
				>
					X
				</div>
			</div>

			<div className={classnames(styles.dialogContent)}>{modalData?.message}</div>
			<div className={classnames(styles.dialogFooter)}>{footer}</div>
		</Modal>
	);
};

export default Dialog;
