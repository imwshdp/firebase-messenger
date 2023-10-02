import { ChangeEvent, FC } from 'react';

import clsx from 'clsx';

import { MessagesHistoryContainer } from '@Containers';
import { UserInfo } from '@Shared/model';

import { NewMessageView, ProfilePicture } from '@Components';

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
	deleteFile: (index: number) => void;
}

const ChatView: FC<PropsType> = ({ chatUser, text, files, sendMessage, deleteFile }) => {
	const urls = files.value.map((file) => URL.createObjectURL(file));
	const isSubmitDisabled = !text.value.length && !files.value.length;

	return (
		<section className={styles['chat_view']}>
			<header className={styles['chat_view__header']}>
				{chatUser && (
					<>
						<ProfilePicture photoURL={chatUser.photoURL} title={chatUser.displayName} />
						<h1>Conversation with</h1>
						<b>{chatUser.displayName}</b>
					</>
				)}
			</header>

			<MessagesHistoryContainer className={styles['chat_view__container']} />

			<div>
				<div
					className={clsx(styles['chat_view__files-preview'], {
						[styles['chat_view__files-preview_empty']]: urls.length === 0,
					})}
				>
					{urls.map((url, index) => {
						const filename = files.value[index].name;
						return (
							<img
								className={styles['chat_view__files-preview__file']}
								src={url}
								key={index}
								alt={filename}
								title={filename}
								onClick={() => deleteFile(index)}
							/>
						);
					})}
				</div>

				<footer
					className={styles['chat_view__panel']}
					style={{ maxHeight: 'MAX_CHAT_VIEW_PANEL_HEIGHT - calc(var(--secondary-offset) * 2)' }}
				>
					<NewMessageView
						text={text.value}
						setText={text.setValue}
						setFiles={files.setValue}
						onSubmit={sendMessage}
						isSubmitDisabled={isSubmitDisabled}
					/>
				</footer>
			</div>
		</section>
	);
};

export default ChatView;
