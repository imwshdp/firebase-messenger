import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo, UsersState } from '@Shared/model';

import { fetchUsers, searchUsers } from './thunks';

const initialState: UsersState = {
	users: [],

	loading: false,
	error: null,
};

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				return { ...state, loading: true };
			})
			.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserInfo[]>) => {
				return { ...state, users: action.payload, loading: false };
			})

			.addCase(searchUsers.pending, (state) => {
				return { ...state, loading: true };
			})
			.addCase(searchUsers.fulfilled, (state, action: PayloadAction<UserInfo[]>) => {
				return { ...state, users: action.payload, loading: false };
			});
	},
});

export default userSlice.reducer;
