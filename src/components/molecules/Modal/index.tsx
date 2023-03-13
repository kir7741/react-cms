/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useLayoutEffect, MouseEvent, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';

import styles from './index.module.css';

interface StyleMap {
	backdrop: string;
	modalWrapper: string;
	modal: string
}

interface ModalProperty {

	/**
	 * class 名稱
	 *
	 * @type {StyleMap}
	 * @memberof ModalProperty
	 */
	styleMap: StyleMap;

	/**
	 * 是否顯示
	 *
	 * @type {boolean}
	 * @memberof ModalProperty
	 */
	isOpen: boolean;

	/**
	 * 是否需要 backdrop
	 *
	 * @type {boolean}
	 * @memberof ModalProperty
	 */
	hasBackdrop: boolean

	/**
	 * 點擊backdrop事件
	 *
	 * @memberof ModalProperty
	 */
	onClickBackdrop: (e: MouseEvent) => void;

	children: React.ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProperty>(({
	styleMap,
	isOpen,
	children,
	hasBackdrop=true,
	onClickBackdrop
}, ref
) => {
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

			{
				hasBackdrop &&
				<div
					className={classnames(styles.backdrop, styleMap?.backdrop)}
					onKeyDown={() => {}}
					onClick={onClickBackdrop}
				/>
			}

			<div
				ref={ref}
				className={classnames(styles.modalWrapper)}
			>
				<div className={classnames(styles.modal, styleMap?.modal)}>{children}</div>
			</div>
		</>,
		modalRoot as Element,
	);
});

export default Modal;
