import { createPortal } from 'react-dom';
import React, { useLayoutEffect } from 'react';
import classnames from 'classnames';
import styles from './index.css';
import { useModal } from '../../../models/modal';

// createPortal

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

	if (!modalData) {
		return null;
	}

	return createPortal(
		(
			<div>
				<div>{header}</div>
				<div
					role="button"
					tabIndex={0}
					onKeyPress={() => {}}
					onClick={() => closeModal(uuId)}
				>X</div>
				<div className={classnames(styles.modal, className)}>
					{modalData?.message}
				</div>
				<div>{footer}</div>
			</div>
		),
		modalRoot
	);

}

export default Modal;
