import { FC, ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@Config';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import { setUser } from '@Store/slices/userSlice';

import { Loader } from '@Components/Loader';

interface PropsType {
	children: ReactNode;
}

const AppContainer: FC<PropsType> = ({ children }) => {
	const dispatch = useAppDispatch();
	const [user, loading] = useAuthState(auth);

	if (user) {
		dispatch(
			setUser({
				email: user.email,
				id: user.uid,
				token: user.refreshToken,
				displayName: user.displayName || 'Anonymous',
				photoUrl: user.photoURL || null,
			}),
		);
	}

	return <>{loading ? <Loader /> : children}</>;
};

export default AppContainer;
