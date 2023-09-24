import useAppSelector from './useAppSelector';

export function useAuth() {
	const { email, uid } = useAppSelector((state) => state.user);

	return {
		isAuth: !!uid,
		email,
		uid,
	};
}
