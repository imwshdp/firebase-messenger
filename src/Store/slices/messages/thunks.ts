import { FirebaseError } from 'firebase/app';

import ApiService from '@Api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERRNO } from '@Shared/content/constants';
import { firebaseErrorParser } from '@Shared/helpers/firebaseErrorParser';
import { FetchMessagesRequestParamsType, Message } from '@Shared/model';
import { RejectValueWithGetStateType } from '@Store';

export const fetchMessages = createAsyncThunk<
	Array<Message>,
	FetchMessagesRequestParamsType,
	RejectValueWithGetStateType
>('messages/fetchMessages', async (data, { rejectWithValue, getState }) => {
	try {
		const lastMessageUid = getState().messages.messages[0].uid;
		const response = await ApiService.chats.fetch({ ...data, endBeforeUid: lastMessageUid });
		return response;
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
