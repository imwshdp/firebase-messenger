import { FC, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import App from '@App';
import { auth } from '@Config';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { fetchChats } from '@Store/slices/chats';
import { setUser } from '@Store/slices/user/slice';

import { Loader } from '@Components';

const AppContainer: FC = () => {
	const dispatch = useAppDispatch();

	const isLoadingViaLogin = useAppSelector((state) => state.user.loading);

	const [user, loading] = useAuthState(auth);
	const isLoading = loading || isLoadingViaLogin;

	useEffect(() => {
		if (user) {
			const { email, uid, displayName } = user;

			if (email && uid && displayName) {
				dispatch(
					setUser({
						email,
						uid,
						displayName: displayName,
						photoURL: user.photoURL || null,
					}),
				);
			}
		}
	}, [user]);

	useEffect(() => {
		fetchChats();
	}, []);

	return <>{isLoading ? <Loader /> : <App />}</>;
};

export default AppContainer;
