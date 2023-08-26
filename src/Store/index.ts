import { configureStore } from '@reduxjs/toolkit';

import { default as userReducer } from './slices/userSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});
