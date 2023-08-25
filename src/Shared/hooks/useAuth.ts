import useAppSelector from './useAppSelector';

export function useAuth() {
	const { email, token, id } = useAppSelector(state => state.user);

	return {
		isAuth: !!id,
		email,
		token,
		id,
	};
}
