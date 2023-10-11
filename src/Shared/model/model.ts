// User

import { COLOR_SCHEMES } from '@Shared/content/constants';

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
	filteredChats: UserChatInfo[];
	loading: boolean;
	error: boolean;
}

export type UserChatsSnapshotTupleType = [string, UserChatSnapshotInfo];

// Users

export interface UsersState {
	users: UserInfo[];
	loading: boolean;
	error: boolean;
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
	page: number;
	loading: boolean;
	error: boolean;
	isAllLoaded: boolean;
}

export interface MessageState {
	text: string;
	files: string[];
}

// Config

export interface ConfigState {
	colorScheme: COLOR_SCHEMES;
	isNavbarCollapsed: boolean;
}

// Error

export interface ErrorState {
	code: number;
	message: string;
}

// Modal

export interface ModalState {
	isModalOpen: boolean;
	urls: Array<string>;
	activeUrlIndex: number;
}
