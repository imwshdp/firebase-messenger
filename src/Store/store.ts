import { configureStore } from '@reduxjs/toolkit';
import { ErrorState } from '@Shared/model';

import { default as chatsReducer } from './slices/chats';
import { default as configReducer } from './slices/config';
import { default as errorsReducer } from './slices/errors';
import { default as menuReducer } from './slices/menu';
import { default as messagesReducer } from './slices/messages';
import { default as modalReducer } from './slices/modal';
import { default as userReducer } from './slices/user';
import { default as usersReducer } from './slices/users';
import { default as validationReducer } from './slices/validation';

export const store = configureStore({
	reducer: {
		user: userReducer,
		chats: chatsReducer,
		users: usersReducer,
		messages: messagesReducer,
		config: configReducer,
		errors: errorsReducer,
		modal: modalReducer,
		menu: menuReducer,
		validation: validationReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type RejectWithValueType = {
	rejectValue: ErrorState;
};

export type RejectValueWithGetStateType = {
	rejectValue: ErrorState;
	state: RootState;
};
