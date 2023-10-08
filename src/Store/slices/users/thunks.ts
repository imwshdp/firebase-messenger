import { FirebaseError } from 'firebase/app';

import ApiService from '@Api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERRNO } from '@Shared/content/constants';
import { firebaseErrorParser } from '@Shared/helpers/firebaseErrorParser';
import { FilterChatsRequestParamsType, UserInfo } from '@Shared/model';
import { RejectWithValueType } from '@Store';

export const fetchUsers = createAsyncThunk<UserInfo[], void, RejectWithValueType>(
	'users/fetchUsers',
	async (_, { rejectWithValue }) => {
		try {
			return await ApiService.users.fetch();
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				return rejectWithValue(firebaseErrorParser(error.code, error.message));
			} else {
				const [code, message] = ERRNO;
				return rejectWithValue({
					code,
					message,
				});
			}
		}
	},
);

export const searchUsers = createAsyncThunk<
	UserInfo[],
	FilterChatsRequestParamsType,
	RejectWithValueType
>('users/searchUsers', async (data, { rejectWithValue }) => {
	try {
		return await ApiService.users.search(data);
	} catch (error: unknown) {
		if (error instanceof FirebaseError) {
			return rejectWithValue(firebaseErrorParser(error.code, error.message));
		} else {
			const [code, message] = ERRNO;
			return rejectWithValue({
				code,
				message,
			});
		}
	}
});
