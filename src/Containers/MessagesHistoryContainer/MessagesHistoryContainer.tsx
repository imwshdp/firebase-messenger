import { forwardRef, useEffect } from 'react';

import { collection, limitToLast, onSnapshot, orderBy, query } from 'firebase/firestore';

import { db } from '@Config';
import { COLLECTIONS, DATABASES, PAGE_MESSAGE_NUMBER } from '@Shared/content/constants';
import { converter } from '@Shared/helpers/typesConverter';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { MessageSnapshotResponseType } from '@Shared/model';
import { fetchMessages, setMessages } from '@Store/slices/messages';

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

		const messagePage = useAppSelector((state) => state.messages.page);

		useEffect(() => {
			if (!chatId) return;

			const collectionChatRef = collection(db, DATABASES.chats, chatId, COLLECTIONS.messages);
			const messagesQuery = query(
				collectionChatRef,
				orderBy('date'),
				limitToLast(messagePage * PAGE_MESSAGE_NUMBER),
			);

			const unsub = onSnapshot(
				messagesQuery.withConverter(converter<MessageSnapshotResponseType>()),
				(doc) => {
					const response: Array<MessageSnapshotResponseType> = [];
					doc.forEach((doc) => response.push(doc.data()));
					if (response) {
						dispatch(setMessages(response));
					}
				},
			);

			return () => {
				unsub();
			};
		}, [chatId]);

		const handleFetchMessages = () => {
			console.log('CALLED');
			if (!chatId) return;
			dispatch(
				fetchMessages({
					chatId,
					page: messagePage,
				}),
			);
		};

		return (
			<MessagesHistory
				className={className}
				messages={messagesList}
				chatUserPhotoURL={chatUserPhotoURL}
				currentUserId={currentUserId}
				currentUserPhotoURL={currentUserPhotoURL}
				ref={ref}
				observerCallback={handleFetchMessages}
			/>
		);
	},
);

export default MessagesHistoryContainer;
