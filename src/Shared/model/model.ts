// General

export interface UserInfo {
	uid: string;
	displayName: string;
	photoURL: string | null;
}

// User

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
	date: {
		nanoseconds: string;
		seconds: string;
	};
	userInfo: UserInfo;
}

export interface ChatsState {
	chats: UserChatInfo[];
	loading: boolean;
	error: string | null;
}

// Users

export interface UsersState {
	users: UserInfo[];
	loading: boolean;
	error: string | null;
}

// Messages

export interface MessagesState {
	chatId: string | null;
	user: UserInfo | null;
	// TODO fix any
	messages: Array<any>;
	error: string | null;
}

export interface MessageState {
	text: string;
	images: File[];
}
