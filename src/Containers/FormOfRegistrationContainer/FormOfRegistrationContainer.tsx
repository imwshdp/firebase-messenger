import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { RoutesLinks } from '@Router';
import { FORM_TYPE } from '@Shared/content/constants';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import { RegistrationRequestParamsType } from '@Shared/types';
import { registerUserFx } from '@Store/slices/user';

import { Form } from '@Components';

const FormOfRegistrationContainer: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleRegister = (data: RegistrationRequestParamsType) => {
		dispatch(registerUserFx(data))
			.then(() => {
				alert('Успешная регистрация');
			})
			.then(() => navigate(RoutesLinks.login, { replace: true }))
			.catch(alert);
	};

	return (
		<div>
			<Form
				buttonTitle='Зарегистрироваться'
				handleRegister={handleRegister}
				type={FORM_TYPE.register}
			>
				<span>
					Уже есть запись? <Link to='/login'>Войти</Link>
				</span>
			</Form>
		</div>
	);
};

export default FormOfRegistrationContainer;
