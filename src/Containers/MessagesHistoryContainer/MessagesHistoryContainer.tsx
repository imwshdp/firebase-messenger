import { FC, useEffect } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '@Config';
import { DATABASES } from '@Shared/content/constants';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { setMessages } from '@Store/slices/messages';

import { MessagesHistory } from '@Components';

interface PropsType {
	className?: string;
}

const MessagesHistoryContainer: FC<PropsType> = ({ className }) => {
	const dispatch = useAppDispatch();
	const chatId = useAppSelector((state) => state.messages.chatId);

	useEffect(() => {
		let unsub = () => {};

		if (chatId) {
			unsub = onSnapshot(doc(db, DATABASES.chats, chatId), (doc) => {
				const response = doc.data() as { messages: [] };
				doc.exists() && dispatch(setMessages(response.messages));
			});
		}

		return () => {
			unsub();
		};
	}, [chatId]);

	return <MessagesHistory className={className} />;
};

export default MessagesHistoryContainer;
