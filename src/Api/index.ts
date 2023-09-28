import { loginWithEmailPassword, loginWithGoogle, registerNewUser } from './authorizationApi';
import { openChat } from './chatsApi';
import { fetchChats, searchChats } from './usersApi';

const ApiService = {
	auth: {
		register: registerNewUser,
		login: loginWithEmailPassword,
		loginByGoogle: loginWithGoogle,
	},

	chats: {
		open: openChat,
	},

	users: {
		fetch: fetchChats,
		search: searchChats,
	},
};

export default ApiService;
