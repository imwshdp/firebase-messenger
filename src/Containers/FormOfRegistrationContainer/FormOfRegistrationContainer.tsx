import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { RoutesLinks } from '@Router';
import { FORM_TYPES } from '@Shared/content/constants';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { registerUser } from '@Store/slices/user';
import {
	resetValidation,
	validateEmail,
	validateForm,
	validateName,
	validatePassword,
} from '@Store/slices/validation';

import { Form } from '@Components';

const FormOfRegistrationContainer: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const validation = useAppSelector((state) => state.validation);

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [profilePicture, setProfilePicture] = useState<File | null>(null);
	const [displayName, setDisplayName] = useState<string>('');

	const isFormNotValid =
		validation.email.length || validation.password.length || validation.name.length;

	const handleSetEmail = (value: string) => {
		dispatch(validateEmail(value));
		setEmail(value);
	};

	const handleSetPassword = (value: string) => {
		dispatch(validatePassword(value));
		setPassword(value);
	};

	const handleSetDisplayName = (value: string) => {
		dispatch(validateName(value));
		setDisplayName(value);
	};

	const handleSetProfilePicture = (value: File) => {
		if (value.type.includes('image')) {
			setProfilePicture(value);
		}
	};

	const handleSubmit = () => {
		dispatch(validateForm());
		!isFormNotValid &&
			dispatch(registerUser({ email, password, displayName, profilePicture }))
				.unwrap()
				.then(() => navigate(RoutesLinks.login, { replace: true }))
				.then(() => {
					dispatch(resetValidation());
				})
				.catch(console.error);
	};

	useEffect(() => {
		dispatch(validateEmail(email));
		dispatch(validatePassword(password));
		dispatch(validateName(displayName));

		return () => {
			dispatch(resetValidation());
		};
	}, []);

	return (
		<div>
			<Form
				buttonTitle='Зарегистрироваться'
				type={FORM_TYPES.register}
				state={{
					email: {
						value: email,
						setValue: handleSetEmail,
					},
					password: {
						value: password,
						setValue: handleSetPassword,
					},
					displayName: {
						value: displayName,
						setValue: handleSetDisplayName,
					},
					profilePicture: {
						value: profilePicture,
						setValue: handleSetProfilePicture,
					},
				}}
				onSubmit={handleSubmit}
				validation={validation}
			>
				<span>
					Уже есть запись? <Link to='/login'>Войти</Link>
				</span>
			</Form>
		</div>
	);
};

export default FormOfRegistrationContainer;
