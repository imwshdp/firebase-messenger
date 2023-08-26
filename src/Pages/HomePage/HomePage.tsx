import { FC } from 'react';

import { ChatView } from '@Components';
import { useAuth } from '@Shared/hooks/useAuth';

import styles from './HomePage.module.scss';

const HomePage: FC = () => {
	const { email } = useAuth();

	const greeting = `Welcome ${email}!`;

	return (
		<section className={styles['page_wrapper']}>
			<h1>{greeting}</h1>
			<ChatView />
		</section>
	);
};

export default HomePage;
