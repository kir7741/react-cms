import React from 'react';

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

	return (
		<Modal
			isOpen={!!(modalData && uuId)}
			styleMap={(
				{
					backdrop: styles.Datepicker,
					modalWrapper: '',
					modal: styles.datepickerModal
				}
			)}
		>
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
