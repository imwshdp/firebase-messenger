import { FirebaseError } from 'firebase/app';

import ApiService from '@Api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERRNO } from '@Shared/content/constants';
import { firebaseErrorParser } from '@Shared/helpers/firebaseErrorParser';
import { FetchMessagesRequestParamsType, Message } from '@Shared/model';
import { RejectWithValueType } from '@Store';

export const fetchMessages = createAsyncThunk<
	Array<Message>,
	FetchMessagesRequestParamsType,
	RejectWithValueType
>('messages/fetchMessages', async (data, { rejectWithValue }) => {
	try {
		return await ApiService.chats.fetch(data);
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
