import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore/lite';

import { db } from '@Config';
import { DATABASES } from '@Shared/content/constants';
import { FetchChatsRequestParamsType } from '@Shared/model';

export const fetchChats = async () => {
	const result: DocumentData[] = [];
	const usersRef = collection(db, DATABASES.users);
	const usersQuery = query(usersRef);
	const querySnapshot = await getDocs(usersQuery);
	querySnapshot.forEach((document) => result.push(document.data()));
	return result;
};

export const searchChats = async ({ userName }: FetchChatsRequestParamsType) => {
	const result: DocumentData[] = [];
	const usersRef = collection(db, DATABASES.users);
	const usersQuery = query(usersRef, where('dispayName', '==', userName));
	const querySnapshot = await getDocs(usersQuery);
	querySnapshot.forEach((document) => result.push(document.data()));
	return result;
};
