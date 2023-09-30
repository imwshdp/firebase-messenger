import { FC } from 'react';

import { ChatListWithSearchContainer, UserListWithSearchContainer } from '@Containers';

import styles from './ChatsPanel.module.scss';

const ChatsPanel: FC = () => {
	return (
		<aside className={styles['chats']}>
			<section className={styles['chats__list']}>
				<div className={styles['chats__list__chats']}>
					<ChatListWithSearchContainer />
				</div>

				<div className={styles['chats__list__separator']} />

				<div className={styles['chats__list__users']}>
					<UserListWithSearchContainer />
				</div>
			</section>
		</aside>
	);
};

export default ChatsPanel;
