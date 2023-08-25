import { useAuth } from '@Shared/hooks/useAuth';
import { FC } from 'react';
import { Link, Navigate } from 'react-router-dom';

const HomePage: FC = () => {
	const { isAuth, email } = useAuth();

	const greeting = `Welcome ${email}!`;

	return isAuth ? (
		<section>
			<h1>homepage</h1>
			<h2>{greeting}</h2>
			<Link to='login'>login</Link>
			<hr></hr>
			<Link to='registration'>register</Link>
		</section>
	) : (
		<Navigate to='/login' />
	);
};

export default HomePage;
