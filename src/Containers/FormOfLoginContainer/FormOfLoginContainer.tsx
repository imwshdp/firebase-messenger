import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import { auth } from '@Config';
import { RoutesLinks } from '@Router';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import { setUser } from '@Store/slices/userSlice';

import { Form } from '@Components';

const FormOfLoginContainer: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogin = (email: string, password: string) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(res => {
				console.log('user = ', res);
				const { user } = res;
				dispatch(
					setUser({
						email: user.email,
						id: user.uid,
						token: user.refreshToken,
						displayName: user.displayName || 'Anonymous',
						photoUrl: user.photoURL || null,
					}),
				);
			})
			.then(() => navigate(RoutesLinks.root, { replace: true }))
			.catch(alert);
	};

	const handleGoogleLogin = () => {
		signInWithPopup(auth, new GoogleAuthProvider())
			.then(res => {
				console.log('user = ', res);
				const { user } = res;
				dispatch(
					setUser({
						email: user.email,
						id: user.uid,
						token: user.refreshToken,
						displayName: user.displayName || 'Anonymous',
						photoUrl: user.photoURL || null,
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
