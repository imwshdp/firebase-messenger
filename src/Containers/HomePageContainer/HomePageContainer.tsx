import { FC, useEffect } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '@Config';
import { HomePage } from '@Pages';
import { DATABASES } from '@Shared/content/constants';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { setChats } from '@Store/slices/chats';
import { fetchUsers } from '@Store/slices/users';

const HomePageContainer: FC = () => {
	const dispatch = useAppDispatch();
	const currentUserId = useAppSelector((state) => state.user.uid);

	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(doc(db, DATABASES.usersChats, currentUserId), (doc) => {
				const response = doc.data() as object | undefined;
				dispatch(setChats(response ? Object.entries(response) : []));
			});

			return () => {
				unsub();
			};
		};

		currentUserId && getChats();
	}, [currentUserId]);

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	return <HomePage />;
};

export default HomePageContainer;
