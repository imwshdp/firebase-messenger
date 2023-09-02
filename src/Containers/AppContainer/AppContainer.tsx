import { FC, ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@Config';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import { setUser } from '@Store/slices/user/userSlice';

import { Loader } from '@Components';

interface PropsType {
	children: ReactNode;
}

const AppContainer: FC<PropsType> = ({ children }) => {
	const dispatch = useAppDispatch();
	const [user, loading] = useAuthState(auth);

	if (user) {
		const { email, uid, refreshToken, displayName } = user;

		if (email && uid && refreshToken && displayName) {
			dispatch(
				setUser({
					email,
					uid,
					token: refreshToken,
					displayName: displayName || 'Anonymous',
					photoUrl: user.photoURL || null,
				}),
			);
		}
	}

	return <>{loading ? <Loader /> : children}</>;
};

export default AppContainer;
