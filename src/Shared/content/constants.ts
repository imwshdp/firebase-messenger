export const MAX_CHAT_VIEW_PANEL_HEIGHT = 200;

export enum FORM_TYPES {
	login,
	register,
}

export const DEBOUNCE_DELAY = 1000;

export const DATABASES = {
	users: 'users',
	userChats: 'userChats',
	chats: 'chats',
};

export enum LIST_LINK_TYPES {
	Users,
	Chats,
}

export enum COLOR_SCHEMES {
	light = 'light-theme',
	dark = 'dark-theme',
}

export const LOCAL_STORAGE_KEYS = {
	colorScheme: 'colorScheme',
	navbarCollapsedStatus: 'navbarCollapsedStatus',
};

export const VISIBLE_NOTIFICATIONS_NUMBER = 4;

export const ERRNO = {
	internal: [
		500,
		'We are sorry, but service is not available at this moment. Please try again later!',
	],
};

export const firebaseErrors = {
	// Auth
	userNotFound: 'auth/user-not-found',
	emailAlreadyExists: 'auth/email-already-exists',
	emailAlreadyUsed: 'auth/email-already-in-use',
	tokenExpired: 'auth/id-token-expired',
	internal: 'auth/internal-error',
	invalidPassword: 'auth/invalid-password',
	stackOverflow: 'auth/too-many-requests',

	// Storage
	unknown: 'storage/unknown',
	quotaExceeded: 'storage/quota-exceeded',
	blobSlice: 'storage/cannot-slice-blob',
	fileSize: 'storage/server-file-wrong-size',
};
