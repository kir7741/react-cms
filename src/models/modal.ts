import { handleActions, createAction, Action } from 'redux-actions';
import { useRedux } from 'util/hook/redux';

import { State as GlobalState } from './reducers';
import { Modal } from '../types/interfaces/modal';

/**
 * 此 hook 的狀態介面
 * for global state use
 *
 * @export
 * @interface State
 */
export interface State {

	/**
	 * modal 資料列表（stack）
	 *
	 * @type {Modal}
	 * @memberof State
	 */
	modalList: Modal[];

}

/**
 * 初始使用者資訊狀態
 */
const initialState: State = {
	modalList: []
};

/**
 * 打開modal
 */
export const openModal = createAction<Modal, Modal>(
	'OPEN_MODAL',
	(modal: Modal) => modal
);

/**
 * 關閉modal
 */
export const closeModal = createAction<Modal, string>(
	'CLOSE_MODAL',
	(uuId: string) => ({message: '', uuId})
);

export const reducer = {
	modal: handleActions(
		{
			OPEN_MODAL: (state, action: Action<Modal>) => ({
				...state,
				modalList: [...state.modalList, {
					message: action.payload.message,
					uuId: action.payload.uuId,
				}]
			}),
			CLOSE_MODAL: (state, action: Action<Modal>) => ({
				...state,
				modalList: state.modalList.filter(el => el.uuId !== action.payload.uuId)
			})
		},
		initialState
	)
};

const modalSelector = (state: GlobalState) => ({
	modalList: state.modal.modalList
});

const modalActionsMap = {
	/**
	 * 開啟 modal
	 */
	openModal,

	/**
	 * 關閉 modal
	 */
	closeModal
};

type ModalSelector = ReturnType<typeof modalSelector>;
type ModalActionsMap = typeof modalActionsMap;

export const useModal = () =>
	useRedux<ModalSelector, ModalActionsMap>(modalSelector, modalActionsMap);
