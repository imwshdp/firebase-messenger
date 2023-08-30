import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@Shared/types/user';

const initialState: IUser = {
	email: null,
	token: null,
	id: null,
	displayName: null,
	photoUrl: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IUser>) {
			const { email, token, id, displayName, photoUrl } = action.payload;
			state.email = email;
			state.token = token;
			state.id = id;
			state.displayName = displayName;
			state.photoUrl = photoUrl;
		},
		removeUser() {
			return { ...initialState };
		},
	},
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
