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

	const messagesList = useAppSelector((state) => state.messages.messages);
	const chatId = useAppSelector((state) => state.messages.chatId);

	const chatUserId = useAppSelector((state) => state.messages.user?.uid);
	const chatUserPhotoURL = useAppSelector((state) => state.messages.user?.photoURL);

	const currentUserId = useAppSelector((state) => state.user.uid);
	const currentUserPhotoURL = useAppSelector((state) => state.user.photoURL);

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
