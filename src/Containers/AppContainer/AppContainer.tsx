import { FC, ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Loader } from '@Components/Loader';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import { setUser } from '@Store/slices/userSlice';
import { getAuth } from 'firebase/auth';

interface PropsType {
	children: ReactNode;
}

const AppContainer: FC<PropsType> = ({ children }) => {
	const dispatch = useAppDispatch();
	const [user, loading] = useAuthState(getAuth());

	if (user) {
		dispatch(
			setUser({
				email: user.email,
				id: user.uid,
				token: user.refreshToken,
			}),
		);
	}

	return <>{loading ? <Loader /> : children}</>;
};

export default AppContainer;
