import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getParsedDateFromIso } from '@Shared/helpers/getParsedDateFromIso';
import { Message, MessagesSnapshotResponseType, MessagesState, UserInfo } from '@Shared/model';

const initialState: MessagesState = {
	chatId: null,
	user: null,
	messages: [],
	error: null,
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
				messages: Array<MessagesSnapshotResponseType>,
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
});

export const { setChatUser, setMessages, resetChat } = messagesSlice.actions;
export default messagesSlice.reducer;
