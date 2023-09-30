import { FC } from 'react';

import { MessagesHistoryContainer, NewMessageViewContainer } from '@Containers';
import { UserInfo } from '@Shared/model';

import styles from './ChatView.module.scss';

interface PropsType {
	chatUser: UserInfo | null;
}

const ChatView: FC<PropsType> = ({ chatUser }) => {
	return (
		<section className={styles['chat_view']}>
			<header className={styles['chat_view__header']}>
				{chatUser && (
					<>
						<img
							className={styles['chat_view__header__profile-picture']}
							// TODO handle ?
							src={chatUser.photoURL || ''}
							alt='User Profile Photo'
						/>
						<h1>Conversation with</h1>
						<b>{chatUser.displayName}</b>
					</>
				)}
			</header>
			<MessagesHistoryContainer className={styles['chat_view__container']} />
			<footer
				className={styles['chat_view__panel']}
				style={{ maxHeight: 'MAX_CHAT_VIEW_PANEL_HEIGHT - calc(var(--secondary-offset) * 2)' }}
			>
				<NewMessageViewContainer />
			</footer>
		</section>
	);
};

export default ChatView;
