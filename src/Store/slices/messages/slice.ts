import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getParsedDateFromIso } from '@Shared/helpers/getParsedDateFromIso';
import { Message, MessageSnapshotResponseType, MessagesState, UserInfo } from '@Shared/model';

import { fetchMessages } from './thunks';

const initialState: MessagesState = {
	chatId: null,
	user: null,
	messages: [],

	page: 1,
	isAllLoaded: false,

	loading: false,
	error: false,
};

const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		setChatUser(
			state,
			{
				payload,
			}: PayloadAction<{
				chatId: string;
				user: UserInfo;
			}>,
		) {
			const { chatId, user } = payload;
			return {
				...state,
				chatId,
				user: {
					uid: user.uid,
					displayName: user.displayName,
					photoURL: user.photoURL,
				},
			};
		},

		setMessages: {
			reducer: (state, { payload }: PayloadAction<Message[]>) => {
				return { ...state, messages: payload };
			},
			prepare: (
				messages: Array<MessageSnapshotResponseType>,
			): {
				payload: Message[];
			} => {
				return {
					payload: messages.map((message) => {
						return {
							...message,
							date: getParsedDateFromIso(message.date.toDate().toISOString()),
						};
					}),
				};
			},
		},

		resetChat() {
			return initialState;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchMessages.pending, (state) => {
				return { ...state, loading: true, error: false };
			})
			.addCase(fetchMessages.fulfilled, (state, { payload }: PayloadAction<Message[]>) => {
				if (payload.length > 0) {
					return {
						...state,
						loading: false,
						error: false,
						messages: [...payload, ...state.messages],
						page: state.page + 1,
					};
				} else {
					return {
						...state,
						loading: false,
						error: false,
						isAllLoaded: true,
					};
				}
			});
	},
});

export const { setChatUser, setMessages, resetChat } = messagesSlice.actions;
export default messagesSlice.reducer;
