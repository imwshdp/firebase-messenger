import { FC } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import { Form } from '@Components';
import { setUser } from '@Store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const FormOfRegistrationContainer: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleRegister = (email: string, password: string) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				dispatch(
					setUser({
						email: user.email,
						id: user.uid,
						token: user.refreshToken,
					}),
				);
				navigate('/login');
			})
			.catch(console.error);
	};

	return (
		<div>
			<Form buttonTitle='Зарегистрироваться' handleSubmit={handleRegister} />
		</div>
	);
};

export default FormOfRegistrationContainer;
