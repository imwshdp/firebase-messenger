import { FC, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import App from '@App';
import { auth } from '@Config';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { getLocalStorageConfig } from '@Store/slices/config';
import { setUser } from '@Store/slices/user';

import { Loader } from '@Components';

const AppContainer: FC = () => {
	const dispatch = useAppDispatch();
	const isLoadingViaLogin = useAppSelector((state) => state.user.loading);

	useEffect(() => {
		dispatch(getLocalStorageConfig());
	}, []);

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

	return (
		<>
			<App />
			{isLoading && <Loader />}
		</>
	);
};

export default AppContainer;
