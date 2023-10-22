import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { RoutesLinks } from '@Router';
import { FORM_TYPES } from '@Shared/content/constants';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { RegistrationRequestParamsType } from '@Shared/model';
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
	const isValidationActive = validation.isValidated;

	const isFormNotValid =
		validation.email.length || validation.password.length || validation.name.length;

	const handleRegister = (data: RegistrationRequestParamsType) => {
		dispatch(validateForm());
		!isFormNotValid &&
			dispatch(registerUser(data))
				.unwrap()
				.then(() => navigate(RoutesLinks.login, { replace: true }))
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

	const handleValidateName = (value: string) => {
		dispatch(validateName(value));
	};

	useEffect(() => {
		return () => {
			dispatch(resetValidation());
		};
	}, []);

	console.log('validation :>> ', validation);

	return (
		<div>
			<Form
				buttonTitle='Зарегистрироваться'
				handleRegister={handleRegister}
				type={FORM_TYPES.register}
				validateEmail={handleValidateEmail}
				validatePassword={handleValidatePassword}
				validateName={handleValidateName}
				validation={isValidationActive ? validation : undefined}
			>
				<span>
					Уже есть запись? <Link to='/login'>Войти</Link>
				</span>
			</Form>
		</div>
	);
};

export default FormOfRegistrationContainer;
