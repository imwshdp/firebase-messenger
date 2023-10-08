import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState } from '@Shared/model';

const initialState: ModalState = {
	isModalOpen: false,
	urls: [],
	activeUrlIndex: 0,
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setModalUrls(state, { payload }: PayloadAction<string[]>) {
			return { ...state, urls: [...payload] };
		},
		resetModalUrls(state) {
			return { ...state, urls: [] };
		},
		openModalWithIndex(state, { payload }: PayloadAction<number>) {
			return { ...state, isModalOpen: true, activeUrlIndex: payload };
		},
		closeModal(state) {
			return { ...state, isModalOpen: false };
		},
		setModalActiveUrlIndex(state, { payload }) {
			return { ...state, activeUrlIndex: payload };
		},
	},
});

export const {
	setModalUrls,
	resetModalUrls,
	openModalWithIndex,
	closeModal,
	setModalActiveUrlIndex,
} = modalSlice.actions;
export default modalSlice.reducer;
