import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { RoutesLinks } from '@Router';
import { FORM_TYPES } from '@Shared/content/constants';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import { RegistrationRequestParamsType } from '@Shared/model';
import { registerUser } from '@Store/slices/user';

import { Form } from '@Components';

const FormOfRegistrationContainer: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleRegister = (data: RegistrationRequestParamsType) => {
		dispatch(registerUser(data)).then(() => navigate(RoutesLinks.login, { replace: true }));
	};

	return (
		<div>
			<Form
				buttonTitle='Зарегистрироваться'
				handleRegister={handleRegister}
				type={FORM_TYPES.register}
			>
				<span>
					Уже есть запись? <Link to='/login'>Войти</Link>
				</span>
			</Form>
		</div>
	);
};

export default FormOfRegistrationContainer;
