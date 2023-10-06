import { FC } from 'react';

import { MessagesHistoryContainer, NewMessageSectionContainer } from '@Containers';
import { UserInfo } from '@Shared/model';

import { ProfilePicture } from '@Components';

import styles from './ChatView.module.scss';

interface PropsType {
	chatUser: UserInfo | null;
}

const ChatView: FC<PropsType> = ({ chatUser }) => {
	return (
		<section className={styles['chat_view']}>
			{chatUser && (
				<header className={styles['chat_view__header']}>
					<ProfilePicture photoURL={chatUser.photoURL} title={chatUser.displayName} />
					<h1>Conversation with</h1>
					<b>{chatUser.displayName}</b>
				</header>
			)}

			<MessagesHistoryContainer className={styles['chat_view__container']} />

			<NewMessageSectionContainer />
		</section>
	);
};

export default ChatView;
