import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { RoutesLinks } from '@Router';
import { FORM_TYPE } from '@Shared/content/constants';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import { loginWithEmailPassword, loginWithGoogle } from '@Store/slices/user';

import { Form } from '@Components';

const FormOfLoginContainer: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogin = (email: string, password: string) => {
		dispatch(loginWithEmailPassword({ email, password }))
			.then(() => navigate(RoutesLinks.root, { replace: true }))
			.catch(alert);
	};

	const handleGoogleLogin = () => {
		dispatch(loginWithGoogle())
			.then(() => navigate(RoutesLinks.root))
			.catch(alert);
	};

	return (
		<div>
			<Form
				buttonTitle='Залогиниться'
				handleLogin={handleLogin}
				handleAlternativeLogin={handleGoogleLogin}
				type={FORM_TYPE.login}
			>
				<span>
					Впервые здесь? <Link to='/registration'>Зарегистрироваться</Link>
				</span>
			</Form>
		</div>
	);
};

export default FormOfLoginContainer;
