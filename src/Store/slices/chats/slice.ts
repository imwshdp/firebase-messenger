import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ChatsState, User } from '@Shared/model';

import { fetchChats } from './thunks';

const initialState: ChatsState = {
	chats: [],

	loading: false,
	error: null,
};

const chatsSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchChats.pending, (state) => {
				return { ...state, loading: true };
			})
			.addCase(fetchChats.fulfilled, (state, action: PayloadAction<User[]>) => {
				return { ...state, chats: action.payload, loading: false };
			});
	},
});

// export const { setChats } = chatsSlice.actions;
export default chatsSlice.reducer;
