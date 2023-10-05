export const MAX_CHAT_VIEW_PANEL_HEIGHT = 200;

export enum FORM_TYPES {
	login,
	register,
}

export const DEBOUNCE_DELAY = 1000;

export const DATABASES = {
	users: 'users',
	usersChats: 'userChats',
	chats: 'chats',
};

export const ERROR_CODES = {
	internal: 500,
};

export enum LinkListType {
	Users,
	Chats,
}

export enum ColorSchemes {
	light = 'light-theme',
	dark = 'dark-theme',
}
