import { FC } from 'react';

import { ChatViewContainer } from '@Containers';

import { ChatsPanel } from '@Components';

import styles from './HomePage.module.scss';

const HomePage: FC = () => {
	return (
		<>
			<section className={styles['page_wrapper']}>
				<ChatsPanel />
				<ChatViewContainer />
			</section>
		</>
	);
};

export default HomePage;
