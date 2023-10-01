import { ChangeEvent, FC } from 'react';

import { MessagesHistoryContainer } from '@Containers';
import { UserInfo } from '@Shared/model';

import { NewMessageView } from '@Components';

import styles from './ChatView.module.scss';

interface PropsType {
	chatUser: UserInfo | null;

	text: {
		value: string;
		setValue: (value: string) => void;
	};

	files: {
		value: File[];
		setValue: (event: ChangeEvent<HTMLInputElement>) => void;
	};

	sendMessage: () => void;
}

const ChatView: FC<PropsType> = ({ chatUser, text, files, sendMessage }) => {
	const urls = files.value.map((file) => URL.createObjectURL(file));

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

			{urls.length > 0 && (
				<div className={styles['chat_view__files-preview']}>
					{urls.map((url, index) => {
						const filename = files.value[index].name;
						return (
							<img
								className={styles['chat_view__files-preview__file']}
								src={url}
								key={index}
								alt={filename}
								title={filename}
							/>
						);
					})}
				</div>
			)}

			<footer
				className={styles['chat_view__panel']}
				style={{ maxHeight: 'MAX_CHAT_VIEW_PANEL_HEIGHT - calc(var(--secondary-offset) * 2)' }}
			>
				<NewMessageView
					text={text.value}
					setText={text.setValue}
					setFiles={files.setValue}
					onSubmit={sendMessage}
				/>
			</footer>
		</section>
	);
};

export default ChatView;
