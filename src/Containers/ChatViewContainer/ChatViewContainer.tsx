import { ChangeEvent, FC, useEffect, useState } from 'react';

import { Timestamp } from 'firebase/firestore';

import ApiService from '@Api';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { updateChat } from '@Store/slices/chats';

import { ChatView } from '@Components';

const ChatViewContainer: FC = () => {
	const dispatch = useAppDispatch();
	const chatUser = useAppSelector((state) => state.messages.user);
	const chatId = useAppSelector((state) => state.messages.chatId);
	const currentUserId = useAppSelector((state) => state.user.uid);

	const [messageText, setMessageText] = useState<string>('');
	const [messageFiles, setMessageFiles] = useState<File[]>([]);

	const handleChangeMessageText = (newValue: string) => {
		setMessageText(newValue);
	};

	const handleChangeMessageFiles = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setMessageFiles((previousMessageFiles) => [
				...previousMessageFiles,
				...Array.from(event.target.files || []),
			]);
		}
	};

	const handleDeleteMessageFile = (index: number) => {
		setMessageFiles((previousMessageFiles) => previousMessageFiles.splice(index, 1));
	};

	const resetMessageData = () => {
		setMessageText('');
		setMessageFiles([]);
	};

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

	useEffect(() => {
		resetMessageData();
	}, [chatId]);

	return (
		<ChatView
			chatUser={chatUser}
			text={{
				value: messageText,
				setValue: handleChangeMessageText,
			}}
			files={{
				value: messageFiles,
				setValue: handleChangeMessageFiles,
			}}
			sendMessage={sendMessage}
			deleteFile={handleDeleteMessageFile}
		/>
	);
};

export default ChatViewContainer;
