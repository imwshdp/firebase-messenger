import ApiService from '@Api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERROR_CODES } from '@Shared/content/constants';
import { OpenChatWithUserRequestParamsType, UpdateChatRequestParamsType } from '@Shared/model';
import { RejectWithValueType } from '@Store';

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

export const updateChat = createAsyncThunk<void, UpdateChatRequestParamsType, RejectWithValueType>(
	'chats/updateChat',
	async (data, { rejectWithValue }) => {
		try {
			await ApiService.chats.update(data);
		} catch (error) {
			rejectWithValue(`${ERROR_CODES.internal}: Unable to send message. Please try again later.`);
		}
	},
);
