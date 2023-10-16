import { FC } from 'react';

import { ChatsPanelContainer, ChatViewContainer } from '@Containers';

import styles from './HomePage.module.scss';

const HomePage: FC = () => {
	return (
		<section className={styles['page_wrapper']}>
			<ChatsPanelContainer />
			<ChatViewContainer />
		</section>
	);
};

export default HomePage;
