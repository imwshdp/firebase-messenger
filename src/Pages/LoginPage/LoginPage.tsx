import { FormOfLoginContainer } from '@Containers';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const LoginPage: FC = () => {
	return (
		<section>
			<h1>Login</h1>
			<p>
				or <Link to='/registration'>Register</Link>
			</p>
			<FormOfLoginContainer />
		</section>
	);
};

export default LoginPage;
