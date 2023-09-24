// User

export interface User {
	uid: string;
	email: string;
	displayName: string;
	photoURL: string | null;
}

export interface UserState extends User {
	loading: boolean;
	error: string | null;
}

// Chats

export interface ChatsState {
	chats: User[];
	loading: boolean;
	error: string | null;
}

export interface UserChatInfo {
	uid: string;
	displayName: string;
	photoURL: string | null;
}
