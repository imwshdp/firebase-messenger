import ApiService from '@Api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERROR_CODES } from '@Shared/content/constants';
import { LoginRequestParamsType, RegistrationRequestParamsType, User } from '@Shared/model';
import { RejectWithValueType } from '@Store';

export const registerUser = createAsyncThunk<void, RegistrationRequestParamsType>(
	'user/register',
	async (data) => {
		await ApiService.auth.register(data);
	},
);

export const loginWithEmailPassword = createAsyncThunk<
	User,
	LoginRequestParamsType,
	RejectWithValueType
>('user/loginWithEmailPassword', async (data, { rejectWithValue }) => {
	const response = await ApiService.auth.login(data);

	if (!response) {
		rejectWithValue(`${ERROR_CODES.internal}: Unable to log in. Please try again later.`);
	}

	const { user } = response;
	const { email, uid, displayName, photoURL } = user;
	return { email, uid, displayName, photoURL } as User;
});

export const loginWithGoogle = createAsyncThunk<User, void, RejectWithValueType>(
	'user/loginWithGoogle',
	async (_, { rejectWithValue }) => {
		const response = await ApiService.auth.loginByGoogle();

		if (!response) {
			rejectWithValue(`${ERROR_CODES.internal}: Unable to log in. Please try again later.`);
		}

		const { user } = response;
		const { email, uid, displayName, photoURL } = user;
		return { email, uid, displayName, photoURL } as User;
	},
);
