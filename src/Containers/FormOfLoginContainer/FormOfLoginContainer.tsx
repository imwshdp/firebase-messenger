import { FC, useEffect, useState } from 'react';
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

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const isFormNotValid = validation.email.length || validation.password.length;

	const handleSetEmail = (value: string) => {
		dispatch(validateEmail(value));
		setEmail(value);
	};

	const handleSetPassword = (value: string) => {
		dispatch(validatePassword(value));
		setPassword(value);
	};

	const handleSubmit = () => {
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

	useEffect(() => {
		dispatch(validateEmail(email));
		dispatch(validatePassword(password));

		return () => {
			dispatch(resetValidation());
		};
	}, []);

	return (
		<div>
			<Form
				buttonTitle='Залогиниться'
				type={FORM_TYPES.login}
				state={{
					email: {
						value: email,
						setValue: handleSetEmail,
					},
					password: {
						value: password,
						setValue: handleSetPassword,
					},
				}}
				validation={validation}
				onSubmit={handleSubmit}
				onAlternativeSubmit={handleGoogleLogin}
			>
				<span>
					Впервые здесь? <Link to='/registration'>Зарегистрироваться</Link>
				</span>
			</Form>
		</div>
	);
};

export default FormOfLoginContainer;
