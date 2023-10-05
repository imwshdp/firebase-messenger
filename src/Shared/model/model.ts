// User

import { UserChatSnapshotInfo } from './responses';

export interface UserInfo {
	uid: string;
	displayName: string;
	photoURL: string | null;
}

export interface User extends UserInfo {
	email: string;
}

export interface UserState extends User {
	loading: boolean;
	error: string | null;
}

// Chats

export interface UserChatInfo {
	id: string;
	date: string;
	userInfo: UserInfo;
	lastMessage: {
		text: string;
	};
}

export interface ChatsState {
	chats: UserChatInfo[];
	loading: boolean;
	error: string | null;
}

export type UserChatsSnapshotTupleType = [string, UserChatSnapshotInfo];

// Users

export interface UsersState {
	users: UserInfo[];
	loading: boolean;
	error: string | null;
}

// Messages

export interface Message {
	uid: string;
	text: string;
	files?: string[];
	senderId: string;
	date: string;
}

export interface MessagesState {
	chatId: string | null;
	user: UserInfo | null;
	messages: Array<Message>;
	error: string | null;
}

export interface MessageState {
	text: string;
	files: string[];
}
