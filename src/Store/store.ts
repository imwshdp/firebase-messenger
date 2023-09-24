import { configureStore } from '@reduxjs/toolkit';

import { default as chatsReducer } from './slices/chats/slice';
import { default as userReducer } from './slices/user/slice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		chats: chatsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type RejectWithValueType = {
	rejectValue: string;
};
