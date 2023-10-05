import { FC, useEffect } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '@Config';
import { HomePage } from '@Pages';
import { DATABASES } from '@Shared/content/constants';
import { converter } from '@Shared/helpers/typesConverter';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { UserChatsSnapshotResponseType } from '@Shared/model';
import { setChats } from '@Store/slices/chats';
import { resetChat } from '@Store/slices/messages';
import { fetchUsers } from '@Store/slices/users';

const HomePageContainer: FC = () => {
	const dispatch = useAppDispatch();
	const currentUserId = useAppSelector((state) => state.user.uid);

	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(
				doc(db, DATABASES.usersChats, currentUserId).withConverter(
					converter<UserChatsSnapshotResponseType>(),
				),
				(doc) => {
					const response = doc.data();
					const data = response ? Object.entries(response) : [];
					dispatch(setChats(data));
				},
			);

			return () => {
				unsub();
			};
		};

		currentUserId && getChats();
	}, [currentUserId]);

	useEffect(() => {
		dispatch(fetchUsers());

		return () => {
			dispatch(resetChat());
		};
	}, []);

	return <HomePage />;
};

export default HomePageContainer;
