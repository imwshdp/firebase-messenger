import { FC } from 'react';
import { Form } from '@Components';
// import useAppDispatch from '@Shared/hooks/useAppDispatch';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '@Store/slices/userSlice';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';

const FormOfLoginContainer: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogin = (email: string, password: string) => {
		const auth = getAuth();

		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				dispatch(
					setUser({
						email: user.email,
						id: user.uid,
						token: user.refreshToken,
					}),
				);
				navigate('/');
			})
			.catch(err => console.error(err));
	};

	return (
		<div>
			<Form buttonTitle='Залогиниться' handleSubmit={handleLogin} />
		</div>
	);
};

export default FormOfLoginContainer;
