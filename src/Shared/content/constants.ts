// ui

export const MAX_CHAT_VIEW_PANEL_HEIGHT = 200;

export const PAGE_MESSAGE_NUMBER = 10;

export const VISIBLE_NOTIFICATIONS_NUMBER = 4;

export const MAXIMUM_FILES_TO_UPLOAD = 4;

export enum FORM_TYPES {
	login,
	register,
}

export enum LIST_LINK_TYPES {
	Users,
	Chats,
}

export enum COLOR_SCHEMES {
	light = 'light-theme',
	dark = 'dark-theme',
}

// constants

export const DEBOUNCE_DELAY = 1000;

export const LOCAL_STORAGE_KEYS = {
	colorScheme: 'colorScheme',
	navbarCollapsedStatus: 'navbarCollapsedStatus',
};

export const ERRNO: [number, string] = [
	500,
	'К сожалению, сервис недоступен в данный момент. Пожалуйста попробуйте позже!',
];

// firebase

export const DATABASES = {
	users: 'users',
	userChats: 'userChats',
	chats: 'chats',
};

export const COLLECTIONS = {
	messages: 'messages',
};

export const FIREBASE_ERRORS = {
	// Auth
	userNotFound: 'auth/user-not-found',
	invalidEmail: 'auth/invalid-email',
	wrongPassword: 'auth/wrong-password',
	emailAlreadyExists: 'auth/email-already-exists',
	emailAlreadyUsed: 'auth/email-already-in-use',
	weakPassword: 'auth/weak-password',
	tokenExpired: 'auth/id-token-expired',
	internal: 'auth/internal-error',
	invalidPassword: 'auth/invalid-password',
	stackOverflow: 'auth/too-many-requests',

	// Storage
	unknown: 'storage/unknown',
	quotaExceeded: 'storage/quota-exceeded',
	blobSlice: 'storage/cannot-slice-blob',
	fileSize: 'storage/server-file-wrong-size',

	// Network
	network: 'auth/network-request-failed',
};

export const TABLET_BREAKPOINT = 820;
