import { FirebaseError } from 'firebase/app';

import ApiService from '@Api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERRNO } from '@Shared/content/constants';
import { firebaseErrorParser } from '@Shared/helpers/firebaseErrorParser';
import { LoginRequestParamsType, RegistrationRequestParamsType, User } from '@Shared/model';
import { RejectWithValueType } from '@Store';

export const registerUser = createAsyncThunk<void, RegistrationRequestParamsType>(
	'user/register',
	async (data, { rejectWithValue }) => {
		try {
			await ApiService.auth.register(data);
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

export const loginWithEmailPassword = createAsyncThunk<
	User,
	LoginRequestParamsType,
	RejectWithValueType
>('user/loginWithEmailPassword', async (data, { rejectWithValue }) => {
	try {
		const response = await ApiService.auth.login(data);
		const { user } = response;

		const { email, uid, displayName, photoURL } = user;

		return {
			email: email!,
			uid,
			displayName: displayName!,
			photoURL,
		};
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

export const loginWithGoogle = createAsyncThunk<User, void, RejectWithValueType>(
	'user/loginWithGoogle',
	async (_, { rejectWithValue }) => {
		try {
			return await ApiService.auth.loginByGoogle();
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
