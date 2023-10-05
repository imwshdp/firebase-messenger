import { FC, useEffect } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '@Config';
import { DATABASES } from '@Shared/content/constants';
import { converter } from '@Shared/helpers/typesConverter';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { MessagesSnapshotResponseType } from '@Shared/model';
import { setMessages } from '@Store/slices/messages';

import { MessagesHistory } from '@Components';

interface PropsType {
	className?: string;
}

const MessagesHistoryContainer: FC<PropsType> = ({ className }) => {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector((state) => state.user);
	const messages = useAppSelector((state) => state.messages);

	const messagesList = messages.messages;
	const chatId = messages.chatId;

	const chatUserId = messages.user?.uid;
	const chatUserPhotoURL = messages.user?.photoURL;

	const currentUserId = currentUser.uid;
	const currentUserPhotoURL = currentUser.photoURL;

	useEffect(() => {
		let unsub = () => {};

		if (chatId) {
			unsub = onSnapshot(
				doc(db, DATABASES.chats, chatId).withConverter(converter<MessagesSnapshotResponseType>()),
				(doc) => {
					const response = doc.data();
					if (doc.exists() && response) {
						dispatch(setMessages(response.messages));
					}
				},
			);
		}

		return () => {
			unsub();
		};
	}, [chatId]);

	return (
		<MessagesHistory
			className={className}
			messages={messagesList}
			chatUserId={chatUserId}
			chatUserPhotoURL={chatUserPhotoURL}
			currentUserId={currentUserId}
			currentUserPhotoURL={currentUserPhotoURL}
		/>
	);
};

export default MessagesHistoryContainer;
