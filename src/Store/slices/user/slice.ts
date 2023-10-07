import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isRejectedSliceAction } from '@Shared/helpers/rejectedActions';
import { User, UserState } from '@Shared/model';

import { loginWithEmailPassword, loginWithGoogle, registerUser } from './thunks';

const sliceName = 'user';
const initialState: UserState = {
	email: '',
	uid: '',
	displayName: '',
	photoURL: null,

	loading: false,
};

const userSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setUser(state, { payload }: PayloadAction<User>) {
			return { ...state, ...payload };
		},
		removeUser() {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				return { ...state, loading: true, error: false };
			})
			.addCase(registerUser.fulfilled, (state) => {
				return { ...state, loading: false };
			})

			.addCase(loginWithEmailPassword.pending, (state) => {
				return { ...state, loading: true, error: false };
			})
			.addCase(loginWithEmailPassword.fulfilled, (state, action: PayloadAction<User>) => {
				return {
					...state,
					...action.payload,
					loading: false,
				};
			})

			.addCase(loginWithGoogle.pending, (state) => {
				return { ...state, loading: true, error: false };
			})
			.addCase(loginWithGoogle.fulfilled, (state, action: PayloadAction<User>) => {
				return {
					...state,
					...action.payload,
					loading: false,
				};
			})

			.addMatcher(
				(action) => isRejectedSliceAction(sliceName, action),
				(state) => {
					return {
						...state,
						error: true,
						loading: false,
					};
				},
			);
	},
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
