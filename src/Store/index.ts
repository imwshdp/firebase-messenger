import { configureStore } from '@reduxjs/toolkit';

import { default as userReducer } from './slices/user/userSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});
