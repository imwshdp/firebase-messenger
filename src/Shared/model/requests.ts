// User

import { UserInfo } from './model';

export type RegistrationRequestParamsType = {
	email: string;
	password: string;
	displayName: string;
	profilePicture: File | null;
};

export type LoginRequestParamsType = {
	email: string;
	password: string;
};

// Chats

export type FilterChatsRequestParamsType = {
	userName: string;
};

export type OpenChatWithUserRequestParamsType = {
	currentUser: UserInfo;
	chatUser: UserInfo;
};
