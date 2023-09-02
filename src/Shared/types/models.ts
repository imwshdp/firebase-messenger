export interface IUser {
	uid: string;
	email: string;
	token: string;
	displayName: string;
	photoUrl: string | null;
}

export interface IUserState extends IUser {
	loading: boolean;
	error: string | null;
}
