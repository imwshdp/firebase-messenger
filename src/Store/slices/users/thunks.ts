import ApiService from '@Api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERROR_CODES } from '@Shared/content/constants';
import { FilterChatsRequestParamsType, UserInfo } from '@Shared/model';
import { RejectWithValueType } from '@Store';

export const fetchUsers = createAsyncThunk<UserInfo[], void, RejectWithValueType>(
	'users/fetchUsers',
	async (_, { rejectWithValue }) => {
		const response = await ApiService.users.fetch();

		if (!response) {
			rejectWithValue(
				`${ERROR_CODES.internal}: Unable to load chats data. Please try again later.`,
			);
		}

		return response;
	},
);

export const searchUsers = createAsyncThunk<
	UserInfo[],
	FilterChatsRequestParamsType,
	RejectWithValueType
>('users/searchUsers', async (data, { rejectWithValue }) => {
	const response = await ApiService.users.search(data);

	if (!response) {
		rejectWithValue(`${ERROR_CODES.internal}: Unable to load chats data. Please try again later.`);
	}

	return response;
});
