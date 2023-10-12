import { useEffect } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '@Config';
import { DATABASES } from '@Shared/content/constants';
import { converter } from '@Shared/helpers/typesConverter';
import { UserChatsSnapshotResponseType } from '@Shared/model';
import { setChats } from '@Store/slices/chats';

import useAppDispatch from './useAppDispatch';

interface Params {
	currentUserId: string | null;
}

export function useOnSnapshotChats({ currentUserId }: Params) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!currentUserId) return;

		const unsub = onSnapshot(
			doc(db, DATABASES.userChats, currentUserId).withConverter(
				converter<UserChatsSnapshotResponseType>(),
			),
			(doc) => {
				const response = doc.data();
				const data = response ? Object.entries(response) : [];
				data.every((chat) => chat[1].date) && dispatch(setChats(data));
			},
		);

		return () => {
			unsub();
		};
	}, [currentUserId]);
}
