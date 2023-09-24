import { loginWithEmailPassword, loginWithGoogle, registerNewUser } from './authorizationApi';
import { fetchChats, openChat, searchChats } from './chatsApi';

const ApiService = {
	auth: {
		register: registerNewUser,
		login: loginWithEmailPassword,
		loginByGoogle: loginWithGoogle,
	},

	chats: {
		fetch: fetchChats,
		search: searchChats,
		open: openChat,
	},
};

export default ApiService;
