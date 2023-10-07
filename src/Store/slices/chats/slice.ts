import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getParsedDateFromIso } from '@Shared/helpers/getParsedDateFromIso';
import { isRejectedSliceAction } from '@Shared/helpers/rejectedActions';
import { ChatsState, UserChatInfo, UserChatsSnapshotTupleType } from '@Shared/model';

import { openChat } from './thunks';

const sliceName = 'chats';
const initialState: ChatsState = {
	chats: [],
	filteredChats: [],
	loading: false,
	error: false,
};

const chatsSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setChats: {
			reducer: (state, { payload }: PayloadAction<UserChatInfo[]>) => {
				return { ...state, chats: payload, filteredChats: payload };
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

		filterChats(state, { payload }: PayloadAction<string>) {
			const newState = {
				...state,
				chats: [...state.chats],
				filteredChats:
					payload.length > 0
						? [...state.chats.filter((chat) => chat.userInfo.displayName === payload)]
						: [...state.chats],
			};

			return newState;
		},

		setLoadingManually(state, { payload }: PayloadAction<boolean>) {
			return {
				...state,
				chats: [...state.chats],
				filteredChats: [...state.filteredChats],
				loading: payload,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(openChat.pending, (state) => {
				return { ...state, loading: true, error: false };
			})
			.addCase(openChat.fulfilled, (state) => {
				return { ...state, loading: false, error: false };
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

export const { setChats, filterChats, setLoadingManually } = chatsSlice.actions;
export default chatsSlice.reducer;
