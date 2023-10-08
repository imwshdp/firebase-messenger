import { FirebaseError } from 'firebase/app';

import ApiService from '@Api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERRNO } from '@Shared/content/constants';
import { firebaseErrorParser } from '@Shared/helpers/firebaseErrorParser';
import { OpenChatWithUserRequestParamsType, UpdateChatRequestParamsType } from '@Shared/model';
import { RejectWithValueType } from '@Store';

export const openChat = createAsyncThunk<
	void,
	OpenChatWithUserRequestParamsType,
	RejectWithValueType
>('chats/openChat', async (data, { rejectWithValue }) => {
	try {
		await ApiService.chats.open(data);
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

export const updateChat = createAsyncThunk<void, UpdateChatRequestParamsType, RejectWithValueType>(
	'chats/updateChat',
	async (data, { rejectWithValue }) => {
		try {
			await ApiService.chats.update(data);
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
