import { loginWithEmailPassword, loginWithGoogle, registerNewUser } from './authorizationApi';
import { fetchChats, searchChats } from './chatsApi';

const ApiService = {
	auth: {
		register: registerNewUser,
		login: loginWithEmailPassword,
		loginByGoogle: loginWithGoogle,
	},

	chats: {
		fetch: fetchChats,
		search: searchChats,
	},
};

export default ApiService;
