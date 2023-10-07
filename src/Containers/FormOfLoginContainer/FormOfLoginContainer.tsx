import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { RoutesLinks } from '@Router';
import { FORM_TYPES } from '@Shared/content/constants';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import { loginWithEmailPassword, loginWithGoogle } from '@Store/slices/user';

import { Form } from '@Components';

const FormOfLoginContainer: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogin = (email: string, password: string) => {
		dispatch(loginWithEmailPassword({ email, password }))
			.unwrap()
			.then(() => navigate(RoutesLinks.root, { replace: true }));
	};

	const handleGoogleLogin = () => {
		dispatch(loginWithGoogle())
			.unwrap()
			.then(() => navigate(RoutesLinks.root));
	};

	return (
		<div>
			<Form
				buttonTitle='Залогиниться'
				handleLogin={handleLogin}
				handleAlternativeLogin={handleGoogleLogin}
				type={FORM_TYPES.login}
			>
				<span>
					Впервые здесь? <Link to='/registration'>Зарегистрироваться</Link>
				</span>
			</Form>
		</div>
	);
};

export default FormOfLoginContainer;
