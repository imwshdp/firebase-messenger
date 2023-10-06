import { FC, useEffect, useState } from 'react';

import { Timestamp } from 'firebase/firestore';

import ApiService from '@Api';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { updateChat } from '@Store/slices/chats';

import { NewMessageSection } from '@Components';

const NewMessageSectionContainer: FC = () => {
	const dispatch = useAppDispatch();
	const currentUserId = useAppSelector((state) => state.user.uid);
	const chatUser = useAppSelector((state) => state.messages.user);
	const chatId = useAppSelector((state) => state.messages.chatId);

	const [messageText, setMessageText] = useState<string>('');
	const [messageFiles, setMessageFiles] = useState<File[]>([]);

	const messageFilesUrls = messageFiles.map((file) => URL.createObjectURL(file));

	const isSubmitDisabled = !chatId || (!messageText.length && !messageFiles.length);
	const isAttachFileDisabled = !chatId;

	const handleChangeMessageText = (value: string) => {
		setMessageText(value);
	};

	const handleChangeMessageFiles = (files: FileList | null) => {
		setMessageFiles((previousMessageFiles) =>
			files ? [...previousMessageFiles, ...Array.from(files)] : previousMessageFiles,
		);
	};

	const handleDeleteMessageFile = (index: number) => {
		setMessageFiles((previousMessageFiles) =>
			previousMessageFiles.filter((_, fileIndex) => fileIndex !== index),
		);
	};

	const resetMessageData = () => {
		setMessageText('');
		setMessageFiles([]);
	};

	useEffect(() => {
		resetMessageData();
	}, [chatId]);

	const sendMessage = () => {
		chatId &&
			chatUser &&
			Promise.all([
				ApiService.chats.send({
					chatId,
					date: Timestamp.now(),
					messageFiles,
					messageText,
					senderId: currentUserId,
				}),

				dispatch(
					updateChat({
						senderId: currentUserId,
						userId: chatUser.uid,
						chatId,
						text: messageText,
					}),
				),
			]);

		resetMessageData();
	};

	return (
		<NewMessageSection
			text={messageText}
			onChangeText={handleChangeMessageText}
			files={messageFiles}
			onChangeFiles={handleChangeMessageFiles}
			urls={messageFilesUrls}
			deleteFile={handleDeleteMessageFile}
			sendMessage={sendMessage}
			isSubmitDisabled={isSubmitDisabled}
			isAttachFileDisabled={isAttachFileDisabled}
		/>
	);
};

export default NewMessageSectionContainer;
