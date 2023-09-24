import ApiService from '@Api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERROR_CODES } from '@Shared/content/constants';
import { User } from '@Shared/model';
import { RejectWithValueType } from '@Store';

export const fetchChats = createAsyncThunk<User[], void, RejectWithValueType>(
	'chats/fetchChats',
	async (_, { rejectWithValue }) => {
		const response = await ApiService.chats.fetch();

		if (!response) {
			rejectWithValue(`${ERROR_CODES.internal}: Unable to load chats data. Please try later.`);
		}

		return response as User[];
	},
);

// export const searchChatsFx = createAsyncThunk<{ userName: string }, void, RejectValueType>(
// 	'chats/searchChats',
// 	async ({ userName }, { rejectWithValue }) => {
// 		const response = await ApiService.chats.search(userName);

// 		if (!response) {
// 			return rejectWithValue('Login error.'); // TODO handle
// 		}
// 	},
// );
