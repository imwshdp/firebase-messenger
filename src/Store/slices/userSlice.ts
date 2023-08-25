import { createSlice } from '@reduxjs/toolkit';

interface IUser {
	email: string | null;
	token: string | null;
	id: string | null;
}

const initialState: IUser = {
	email: null,
	token: null,
	id: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			const { email, token, id } = action.payload;
			state.email = email;
			state.token = token;
			state.id = id;
		},
		removeUser() {
			return { ...initialState };
		},
	},
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
