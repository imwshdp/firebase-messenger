import { loginWithEmailPassword, loginWithGoogle, registerNewUser } from './authorizationApi';
import { openChat, sendMessage, updateChat } from './chatsApi';
import { fetchUsers, searchUsers } from './usersApi';

const ApiService = {
	auth: {
		register: registerNewUser,
		login: loginWithEmailPassword,
		loginByGoogle: loginWithGoogle,
	},

	chats: {
		open: openChat,
		send: sendMessage,
		update: updateChat,
	},

	users: {
		fetch: fetchUsers,
		search: searchUsers,
	},
};

export default ApiService;
