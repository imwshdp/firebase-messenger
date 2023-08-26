import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Form } from '@Components';
import { auth, googleProvider } from '@Config';
import { RoutesLinks } from '@Router';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import { setUser } from '@Store/slices/userSlice';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const FormOfLoginContainer: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogin = (email: string, password: string) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				dispatch(
					setUser({
						email: user.email,
						id: user.uid,
						token: user.refreshToken,
					}),
				);
			})
			.then(() => navigate(RoutesLinks.root, { replace: true }))
			.catch(alert);
	};

	const handleGoogleLogin = () => {
		signInWithPopup(auth, googleProvider)
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
			.catch(alert);
	};

	return (
		<div>
			<Form
				buttonTitle='Залогиниться'
				handleSubmit={handleLogin}
				handleAlternativeSubmit={handleGoogleLogin}
				type='login'
			>
				<span>
					Впервые здесь? <Link to='/registration'>Зарегистрироваться</Link>
				</span>
			</Form>
		</div>
	);
};

export default FormOfLoginContainer;
