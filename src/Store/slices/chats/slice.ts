import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ChatsState, UserChatInfo, UserChatsSnapshotResponseType } from '@Shared/model';

import { openChat } from './thunks';

const initialState: ChatsState = {
	chats: [],

	loading: false,
	error: null,
};

const chatsSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		setChats: {
			reducer: (state, { payload }: PayloadAction<UserChatInfo[]>) => {
				return { ...state, chats: [...payload] };
			},
			prepare: (chats: Array<UserChatsSnapshotResponseType>): { payload: UserChatInfo[] } => {
				return {
					payload: chats
						.sort((first, second) => Number(second[1].date) - Number(first[1].date))
						.map(([id, chatData]) => {
							return {
								id,
								date: {
									nanoseconds: String(chatData.date.nanoseconds),
									seconds: String(chatData.date.seconds),
								},
								userInfo: chatData.userInfo,
								lastMessage: chatData.lastMessage,
							};
						}),
				};
			},
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(openChat.pending, (state) => {
				return { ...state, loading: true };
			})
			.addCase(openChat.fulfilled, (state) => {
				return { ...state, loading: false };
			});
	},
});

export const { setChats } = chatsSlice.actions;
export default chatsSlice.reducer;
