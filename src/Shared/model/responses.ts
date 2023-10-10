import { Timestamp } from 'firebase/firestore';

import { UserInfo } from './model';

export type LoginResponseType = {
	email: string | null;
	password: string | null;
	displayName: string | null;
	profilePicture: File | null;
};

export type UserChatSnapshotInfo = {
	date: Timestamp;
	userInfo: UserInfo;
	lastMessage: {
		text: string;
	};
};

export type UserChatsSnapshotResponseType = {
	[key: string]: UserChatSnapshotInfo;
};

export type MessageSnapshotResponseType = {
	uid: string;
	text: string;
	files?: string[];
	senderId: string;
	date: Timestamp;
};
