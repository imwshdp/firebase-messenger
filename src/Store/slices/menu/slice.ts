import { createSlice } from '@reduxjs/toolkit';
import { MenuState } from '@Shared/model';

const initialState: MenuState = {
	isModalOpen: false,
};

export const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		openMenu() {
			return { isModalOpen: true };
		},

		closeMenu() {
			return { isModalOpen: false };
		},
	},
});

export const { openMenu, closeMenu } = menuSlice.actions;
export default menuSlice.reducer;
