import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessagesState, UserInfo } from '@Shared/model';

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

		setMessages(state, { payload }: PayloadAction<any[]>) {
			return { ...state, messages: payload };
		},

		resetChat() {
			return initialState;
		},
	},
});

export const { setChatUser, setMessages, resetChat } = messagesSlice.actions;
export default messagesSlice.reducer;
