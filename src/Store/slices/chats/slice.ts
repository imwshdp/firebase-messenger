import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getParsedDateFromIso } from '@Shared/helpers/getParsedDateFromIso';
import { ChatsState, UserChatInfo, UserChatsSnapshotTupleType } from '@Shared/model';

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
			prepare: (chats: Array<UserChatsSnapshotTupleType>): { payload: UserChatInfo[] } => {
				return {
					payload: chats
						.sort((first, second) => Number(second[1].date) - Number(first[1].date))
						.map(([id, chatData]) => {
							return {
								id,
								date: getParsedDateFromIso(chatData.date.toDate().toISOString()),
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
