import React, { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';

import styles from './index.module.css';

interface StyleMap {
	backdrop: string;
	modalWrapper: string;
}

interface ModalProperty {
	/**
	 * class 名稱
	 *
	 * @type {StyleMap}
	 * @memberof ModalProperty
	 */
	styleMap?: StyleMap;

	/**
	 * 是否顯示
	 *
	 * @type {boolean}
	 * @memberof ModalProperty
	 */
	isOpen: boolean;

	children: React.ReactNode;
}

const Modal: React.FC<ModalProperty> = ({ styleMap, isOpen, children }) => {
	let modalRoot = document.getElementById('modal-root');

	useLayoutEffect(() => {
		if (modalRoot === null) {
			modalRoot = document.createElement('div');
			modalRoot.setAttribute('id', 'modal-root');
			document.body.appendChild(modalRoot);
		}
	}, []);

	if (!isOpen) {
		return null;
	}

	return createPortal(
		<>
			<div className={classnames(styles.backdrop, styleMap?.backdrop)} />
			<div className={classnames(styles.modalWrapper)}>
				<div className={classnames(styles.modal)}>{children}</div>
			</div>
		</>,
		modalRoot as Element,
	);
};

export default Modal;
