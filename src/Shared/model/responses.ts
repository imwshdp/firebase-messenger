import { UserInfo } from './model';

export type LoginResponseType = {
	email: string | null;
	password: string | null;
	displayName: string | null;
	profilePicture: File | null;
};

type UserChatSnapshotInfo = {
	date: {
		nanoseconds: string;
		seconds: string;
	};
	userInfo: UserInfo;
};

export type UserChatsSnapshotResponseType = [string, UserChatSnapshotInfo];
