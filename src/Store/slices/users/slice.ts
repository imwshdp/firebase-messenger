import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isRejectedSliceAction } from '@Shared/helpers/rejectedActions';
import { UserInfo, UsersState } from '@Shared/model';

import { fetchUsers, searchUsers } from './thunks';

const sliceName = 'users';
const initialState: UsersState = {
	users: [],

	loading: false,
	error: false,
};

const userSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				return { ...state, loading: true, error: false };
			})
			.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserInfo[]>) => {
				return { ...state, users: action.payload, loading: false };
			})

			.addCase(searchUsers.pending, (state) => {
				return { ...state, loading: true, error: false };
			})
			.addCase(searchUsers.fulfilled, (state, action: PayloadAction<UserInfo[]>) => {
				return { ...state, users: action.payload, loading: false };
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

export default userSlice.reducer;
