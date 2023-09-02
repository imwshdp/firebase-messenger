import { loginWithEmailPassword, loginWithGoogle, registerNewUser } from './authorizationApi';

const ApiService = {
	auth: {
		register: registerNewUser,
		login: loginWithEmailPassword,
		loginByGoogle: loginWithGoogle,
	},
};

export default ApiService;
