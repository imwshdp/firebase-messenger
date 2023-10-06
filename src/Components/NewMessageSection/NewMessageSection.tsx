import { FC } from 'react';

import { FilesPreview, NewMessageView } from '@Components';

import styles from './NewMessageSection.module.scss';

interface PropsType {
	text: string;
	onChangeText: (value: string) => void;

	files: File[];
	onChangeFiles: (files: FileList | null) => void;
	urls: string[];
	deleteFile: (index: number) => void;

	sendMessage: () => void;
	isSubmitDisabled: boolean;
	isAttachFileDisabled: boolean;
}

const NewMessageSection: FC<PropsType> = ({
	text,
	onChangeText,
	files,
	onChangeFiles,
	urls,
	deleteFile,
	sendMessage,
	isSubmitDisabled,
	isAttachFileDisabled,
}) => {
	return (
		<div className={styles['message']}>
			<FilesPreview files={files} urls={urls} deleteFile={deleteFile} />

			<NewMessageView
				text={text}
				setText={onChangeText}
				setFiles={onChangeFiles}
				onSubmit={sendMessage}
				isSubmitDisabled={isSubmitDisabled}
				isAttachFileDisabled={isAttachFileDisabled}
				className={styles['message__message_view']}
				style={{ maxHeight: 'MAX_CHAT_VIEW_PANEL_HEIGHT - calc(var(--secondary-offset) * 2)' }}
			/>
		</div>
	);
};

export default NewMessageSection;
