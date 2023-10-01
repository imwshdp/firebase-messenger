import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
							date: {
								nanoseconds: String(message.date.seconds),
								seconds: String(message.date.seconds),
							},
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
