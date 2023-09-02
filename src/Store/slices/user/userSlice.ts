import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserState } from '@Shared/types';

import { loginWithEmailPasswordFx, loginWithGoogleFx, registerUserFx } from './thunks';

const initialState: IUserState = {
	email: '',
	token: '',
	uid: '',
	displayName: '',
	photoUrl: null,

	loading: false,
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, { payload }: PayloadAction<IUser>) {
			return { ...state, ...payload };
		},
		removeUser() {
			return { ...initialState };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUserFx.pending, (state) => {
				state.loading = true;
			})
			.addCase(registerUserFx.fulfilled, (state) => {
				state.loading = false;
			})

			.addCase(loginWithEmailPasswordFx.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginWithEmailPasswordFx.fulfilled, (state) => {
				state.loading = false;
			})

			.addCase(loginWithGoogleFx.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginWithGoogleFx.fulfilled, (state) => {
				state.loading = false;
			});
	},
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
