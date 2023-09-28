import { configureStore } from '@reduxjs/toolkit';

import { default as chatsReducer } from './slices/chats';
import { default as userReducer } from './slices/user';
import { default as usersReducer } from './slices/users';

export const store = configureStore({
	reducer: {
		user: userReducer,
		chats: chatsReducer,
		users: usersReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type RejectWithValueType = {
	rejectValue: string;
};
