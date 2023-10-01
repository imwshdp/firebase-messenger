import { configureStore } from '@reduxjs/toolkit';

import { default as chatsReducer } from './slices/chats';
import { default as messagesReducer } from './slices/messages';
import { default as userReducer } from './slices/user';
import { default as usersReducer } from './slices/users';

export const store = configureStore({
	reducer: {
		user: userReducer,
		chats: chatsReducer,
		users: usersReducer,
		messages: messagesReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type RejectWithValueType = {
	rejectValue: string;
};
