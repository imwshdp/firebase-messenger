import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { RoutesLinks } from '@Router';
import { FORM_TYPES } from '@Shared/content/constants';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { loginWithEmailPassword, loginWithGoogle } from '@Store/slices/user';
import {
	resetValidation,
	validateEmail,
	validateForm,
	validatePassword,
} from '@Store/slices/validation';

import { Form } from '@Components';

const FormOfLoginContainer: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const validation = useAppSelector((state) => state.validation);
	const isValidationActive = validation.isValidated;

	const isFormNotValid = validation.email.length || validation.password.length;

	const handleLogin = (email: string, password: string) => {
		dispatch(validateForm());

		!isFormNotValid &&
			dispatch(loginWithEmailPassword({ email, password }))
				.unwrap()
				.then(() => navigate(RoutesLinks.root, { replace: true }))
				.then(() => {
					dispatch(resetValidation());
				})
				.catch(console.error);
	};

	const handleGoogleLogin = () => {
		dispatch(loginWithGoogle())
			.unwrap()
			.then(() => navigate(RoutesLinks.root))
			.then(() => {
				dispatch(resetValidation());
			})
			.catch(console.error);
	};

	const handleValidateEmail = (value: string) => {
		dispatch(validateEmail(value));
	};

	const handleValidatePassword = (value: string) => {
		dispatch(validatePassword(value));
	};

	useEffect(() => {
		return () => {
			dispatch(resetValidation());
		};
	}, []);

	return (
		<div>
			<Form
				buttonTitle='Залогиниться'
				type={FORM_TYPES.login}
				handleLogin={handleLogin}
				handleAlternativeLogin={handleGoogleLogin}
				validateEmail={handleValidateEmail}
				validatePassword={handleValidatePassword}
				validation={isValidationActive ? validation : undefined}
			>
				<span>
					Впервые здесь? <Link to='/registration'>Зарегистрироваться</Link>
				</span>
			</Form>
		</div>
	);
};

export default FormOfLoginContainer;
