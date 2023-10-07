import { FC } from 'react';

import { ChatListWithSearchContainer, UserListWithSearchContainer } from '@Containers';

import styles from './ChatsPanel.module.scss';

const ChatsPanel: FC = () => {
	return (
		<aside className={styles['aside']}>
			<div className={styles['aside__chats']}>
				<ChatListWithSearchContainer />
			</div>

			<div className={styles['aside__separator']} />

			<div className={styles['aside__users']}>
				<UserListWithSearchContainer />
			</div>
		</aside>
	);
};

export default ChatsPanel;
