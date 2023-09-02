import useAppSelector from './useAppSelector';

export function useAuth() {
	const { email, token, uid } = useAppSelector((state) => state.user);

	return {
		isAuth: !!uid,
		email,
		token,
		uid,
	};
}
