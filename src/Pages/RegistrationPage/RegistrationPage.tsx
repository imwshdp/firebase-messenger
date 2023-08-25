import { FormOfRegistrationContainer } from '@Containers';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const RegistrationPage: FC = () => {
	return (
		<section>
			<h1>Register</h1>
			<p>
				or <Link to='/login'>Login</Link>
			</p>
			<FormOfRegistrationContainer />
		</section>
	);
};

export default RegistrationPage;
