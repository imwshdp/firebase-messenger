import { useEffect } from 'react';

import { collection, limitToLast, onSnapshot, orderBy, query } from 'firebase/firestore';

import { db } from '@Config';
import { COLLECTIONS, DATABASES, PAGE_MESSAGE_NUMBER } from '@Shared/content/constants';
import { converter } from '@Shared/helpers/typesConverter';
import { MessageSnapshotResponseType } from '@Shared/model';
import { setMessages } from '@Store/slices/messages';

import useAppDispatch from './useAppDispatch';

interface Params {
	chatId: string | null;
	page: number;
}

// TODO don't forget to use!
export function useOnSnapshotMessages({ chatId, page }: Params) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!chatId) return;

		const collectionChatRef = collection(db, DATABASES.chats, chatId, COLLECTIONS.messages);
		const messagesQuery = query(
			collectionChatRef,
			orderBy('date'),
			limitToLast(page * PAGE_MESSAGE_NUMBER),
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
}
