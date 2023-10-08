import { forwardRef, useEffect } from 'react';

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

const MessagesHistoryContainer = forwardRef<HTMLDivElement, PropsType>(
	function MessagesHistoryContainer({ className }, ref) {
		const dispatch = useAppDispatch();

		const messagesList = useAppSelector((state) => state.messages.messages);
		const chatId = useAppSelector((state) => state.messages.chatId);

		const chatUserPhotoURL = useAppSelector((state) => state.messages.user?.photoURL);

		const currentUserId = useAppSelector((state) => state.user.uid);
		const currentUserPhotoURL = useAppSelector((state) => state.user.photoURL);

		useEffect(() => {
			if (!chatId) return;

			const unsub = onSnapshot(
				doc(db, DATABASES.chats, chatId).withConverter(converter<MessagesSnapshotResponseType>()),
				(doc) => {
					const response = doc.data();
					if (doc.exists() && response) {
						dispatch(setMessages(response.messages));
					}
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
