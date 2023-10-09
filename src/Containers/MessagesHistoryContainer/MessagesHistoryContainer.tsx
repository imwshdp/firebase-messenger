import { forwardRef, useEffect } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '@Config';
import { DATABASES } from '@Shared/content/constants';
import { converter } from '@Shared/helpers/typesConverter';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { MessageSnapshotResponseType } from '@Shared/model';

import { MessagesHistory } from '@Components';

interface PropsType {
	className?: string;
}

const MessagesHistoryContainer = forwardRef<HTMLDivElement, PropsType>(
	function MessagesHistoryContainer({ className }, ref) {
		const messagesList = useAppSelector((state) => state.messages.messages);
		const chatId = useAppSelector((state) => state.messages.chatId);

		const chatUserPhotoURL = useAppSelector((state) => state.messages.user?.photoURL);

		const currentUserId = useAppSelector((state) => state.user.uid);
		const currentUserPhotoURL = useAppSelector((state) => state.user.photoURL);

		useEffect(() => {
			if (!chatId) return;

			const chatDocRef = doc(db, DATABASES.chats, chatId);

			const unsub = onSnapshot(
				chatDocRef.withConverter(converter<Array<MessageSnapshotResponseType>>()),
				(doc) => {
					console.log('doc', doc.data());
					// const response = doc;
					// if (doc.exists() && response) {
					// 	dispatch(setMessages(response));
					// }
				},
			);

			return () => {
				unsub();
			};
		}, [chatId]);

		return (
			<MessagesHistory
				className={className}
				messages={messagesList}
				chatUserPhotoURL={chatUserPhotoURL}
				currentUserId={currentUserId}
				currentUserPhotoURL={currentUserPhotoURL}
				ref={ref}
			/>
		);
	},
);

export default MessagesHistoryContainer;
