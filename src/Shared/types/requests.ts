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
