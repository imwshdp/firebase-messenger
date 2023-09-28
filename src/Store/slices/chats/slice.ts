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
			prepare: (chats: UserChatsSnapshotResponseType[]): { payload: UserChatInfo[] } => {
				return {
					payload: chats.map(([id, chatData]) => {
						return {
							id,
							date: {
								nanoseconds: String(chatData.date.nanoseconds),
								seconds: String(chatData.date.seconds),
							},
							userInfo: chatData.userInfo,
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
