import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Form } from '@Components';
import { auth } from '@Config';
import { RoutesLinks } from '@Router';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const FormOfRegistrationContainer: FC = () => {
	const navigate = useNavigate();

	const handleRegister = (email: string, password: string) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				alert('успешная регистрация');
			})
			.then(() => navigate(RoutesLinks.login, { replace: true }))
			.catch(alert);
	};

	return (
		<div>
			<Form buttonTitle='Зарегистрироваться' handleSubmit={handleRegister} type='register'>
				<span>
					Уже есть запись? <Link to='/login'>Войти</Link>
				</span>
			</Form>
		</div>
	);
};

export default FormOfRegistrationContainer;
