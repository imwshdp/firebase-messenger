import ApiService from '@Api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	LoginRequestParamsType,
	RegistrationRequestParamsType,
	RejectValueType,
} from '@Shared/types';

import { setUser } from './userSlice';

export const registerUserFx = createAsyncThunk<
	void,
	RegistrationRequestParamsType,
	RejectValueType
>('user/register', async (data) => {
	await ApiService.auth.register(data);
});

export const loginWithEmailPasswordFx = createAsyncThunk<
	void,
	LoginRequestParamsType,
	RejectValueType
>('user/loginWithEmailPassword', async (data, { rejectWithValue }) => {
	const response = await ApiService.auth.login(data);

	const { user } = response;
	const { email, uid, refreshToken, displayName } = user;

	if (!email || !uid || !refreshToken || !displayName) {
		return rejectWithValue('Login error.'); // TODO handle
	}

	setUser({
		email,
		uid,
		token: refreshToken,
		displayName: displayName || 'Anonymous',
		photoUrl: user.photoURL || null,
	});
});

export const loginWithGoogleFx = createAsyncThunk<void, void, RejectValueType>(
	'user/loginWithGoogle',
	async (_, { rejectWithValue }) => {
		const response = await ApiService.auth.loginByGoogle();

		const { user } = response;
		const { email, uid, refreshToken, displayName } = user;

		if (!email || !uid || !refreshToken || !displayName) {
			return rejectWithValue('Login error.'); // TODO handle
		}

		setUser({
			email,
			uid,
			token: refreshToken,
			displayName: displayName || 'Anonymous',
			photoUrl: user.photoURL || null,
		});
	},
);
