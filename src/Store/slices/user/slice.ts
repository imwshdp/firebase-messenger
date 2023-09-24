import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '@Shared/model';

import { loginWithEmailPassword, loginWithGoogle, registerUser } from './thunks';

const initialState: UserState = {
	email: '',
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
		setUser(state, { payload }: PayloadAction<User>) {
			return { ...state, ...payload };
		},
		removeUser() {
			return { ...initialState };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				return { ...state, loading: true };
			})
			.addCase(registerUser.fulfilled, (state) => {
				return { ...state, loading: false };
			})

			.addCase(loginWithEmailPassword.pending, (state) => {
				return { ...state, loading: true };
			})
			.addCase(loginWithEmailPassword.fulfilled, (state, action: PayloadAction<User>) => {
				return {
					...state,
					...action.payload,
					loading: false,
				};
			})

			.addCase(loginWithGoogle.pending, (state) => {
				return { ...state, loading: true };
			})
			.addCase(loginWithGoogle.fulfilled, (state, action: PayloadAction<User>) => {
				return {
					...state,
					...action.payload,
					loading: false,
				};
			});
	},
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
