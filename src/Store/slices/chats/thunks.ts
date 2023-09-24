import ApiService from '@Api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERROR_CODES } from '@Shared/content/constants';
import {
	FilterChatsRequestParamsType,
	OpenChatWithUserRequestParamsType,
	User,
} from '@Shared/model';
import { RejectWithValueType } from '@Store';

export const fetchChats = createAsyncThunk<User[], void, RejectWithValueType>(
	'chats/fetchChats',
	async (_, { rejectWithValue }) => {
		const response = await ApiService.chats.fetch();

		if (!response) {
			rejectWithValue(
				`${ERROR_CODES.internal}: Unable to load chats data. Please try again later.`,
			);
		}

		return response as User[];
	},
);

export const searchChats = createAsyncThunk<
	User[],
	FilterChatsRequestParamsType,
	RejectWithValueType
>('chats/searchChats', async (data, { rejectWithValue }) => {
	const response = await ApiService.chats.search(data);

	if (!response) {
		rejectWithValue(`${ERROR_CODES.internal}: Unable to load chats data. Please try again later.`);
	}

	return response as User[];
});

export const openChat = createAsyncThunk<
	void,
	OpenChatWithUserRequestParamsType,
	RejectWithValueType
>('chats/openChat', async (data, { rejectWithValue }) => {
	try {
		await ApiService.chats.open(data);
	} catch (error) {
		rejectWithValue(`${ERROR_CODES.internal}: Unable to load chat data. Please try again later.`);
	}
});
