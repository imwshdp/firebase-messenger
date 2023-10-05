import { FC, useCallback } from 'react';

import { MessagesHistoryContainer } from '@Containers';
import { UserInfo } from '@Shared/model';

import { FilesPreview, NewMessageView, ProfilePicture } from '@Components';

import styles from './ChatView.module.scss';

interface PropsType {
	chatUser: UserInfo | null;

	text: {
		value: string;
		setValue: (value: string) => void;
	};

	files: {
		value: File[];
		setValue: (files: FileList | null) => void;
	};

	sendMessage: () => void;
	deleteFile: (index: number) => void;
}

const ChatView: FC<PropsType> = ({ chatUser, text, files, sendMessage, deleteFile }) => {
	const urls = files.value.map((file) => URL.createObjectURL(file));
	const isSubmitDisabled = !text.value.length && !files.value.length;

	const memoDeleteFile = useCallback((index: number) => deleteFile(index), []);

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

			<footer className={styles['chat_view__message']}>
				<FilesPreview files={files.value} urls={urls} deleteFile={memoDeleteFile} />

				<NewMessageView
					text={text.value}
					setText={text.setValue}
					setFiles={files.setValue}
					onSubmit={sendMessage}
					isSubmitDisabled={isSubmitDisabled}
					className={styles['chat_view__panel']}
					style={{ maxHeight: 'MAX_CHAT_VIEW_PANEL_HEIGHT - calc(var(--secondary-offset) * 2)' }}
				/>
			</footer>
		</section>
	);
};

export default ChatView;
