import { loginWithEmailPassword, loginWithGoogle, registerNewUser } from './authorizationApi';
import { fetchMessages, openChat, sendMessage, updateChat } from './chatsApi';
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
		fetch: fetchMessages,
	},

	users: {
		fetch: fetchUsers,
		search: searchUsers,
	},
};

export default ApiService;
