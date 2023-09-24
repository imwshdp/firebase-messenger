// User

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

export type FetchChatsRequestParamsType = {
	userName: string;
};
