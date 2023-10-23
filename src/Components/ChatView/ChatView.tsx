import { forwardRef } from 'react';

import { MessagesHistoryContainer, NewMessageSectionContainer } from '@Containers';
import { UserInfo } from '@Shared/model';

import { ProfilePicture } from '@Components';

import styles from './ChatView.module.scss';

interface PropsType {
	chatUser: UserInfo | null;
	triggerScroll: () => void;
}

const ChatView = forwardRef<HTMLDivElement, PropsType>(function ChatView(
	{ chatUser, triggerScroll },
	ref,
) {
	return (
		<section className={styles['chat_view']}>
			{chatUser && (
				<header className={styles['chat_view__header']}>
					<ProfilePicture photoURL={chatUser.photoURL} title={chatUser.displayName} />
					<h1>
						Чат с пользователем <b>{chatUser.displayName}</b>
					</h1>
				</header>
			)}

			<MessagesHistoryContainer className={styles['chat_view__container']} ref={ref} />

			<NewMessageSectionContainer triggerScroll={triggerScroll} />
		</section>
	);
});

export default ChatView;
