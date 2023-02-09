import React, { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';

import { useModal } from 'models/modal';

import styles from './index.module.css';

interface ModalProperty {

	/**
	 * modal 流水號
	 *
	 * @type {string}
	 * @memberof ModalProperty
	 */
	uuId: string;

	/**
	 * class 名稱
	 *
	 * @type {string}
	 * @memberof ModalProperty
	 */
	className?: string;

	/**
	 * modal header
	 *
	 * @type {JSX.Element}
	 * @memberof ModalProperty
	 */
	header?: JSX.Element;

	/**
	 * modal footer
	 *
	 * @type {JSX.Element}
	 * @memberof ModalProperty
	 */
	footer?: JSX.Element;

}

const Modal: React.FC<ModalProperty> = ({
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
	}, [])

	if (!modalData || !uuId) {
		return null;
	}

	return createPortal(
		(
			<>
				<div className={classnames(styles.backdrop)}/>
				<div className={classnames(styles.modalWrapper)}>
					<div className={classnames(styles.modal)}>
						<div className={classnames(styles.modalHeader)}>
							{header}
							<div
								role="button"
								tabIndex={0}
								className={classnames(styles.closeBtn)}
								onKeyPress={() => {}}
								onClick={() => closeModal(uuId)}
							>X</div>
						</div>

						<div className={classnames(styles.modalContent)}>
							{modalData?.message}
						</div>
						<div className={classnames(styles.modalFooter)}>{footer}</div>
					</div>

				</div>
			</>

		),
		modalRoot
	);

}

export default Modal;
