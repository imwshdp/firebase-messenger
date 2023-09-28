import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore';

import { db } from '@Config';
import { DATABASES } from '@Shared/content/constants';
import { FilterChatsRequestParamsType } from '@Shared/model';

export const fetchChats = async () => {
	const result: DocumentData[] = [];
	const usersRef = collection(db, DATABASES.users);
	const usersQuery = query(usersRef);
	const querySnapshot = await getDocs(usersQuery);
	querySnapshot.forEach((document) => result.push(document.data()));
	return result;
};

export const searchChats = async ({ userName }: FilterChatsRequestParamsType) => {
	const result: DocumentData[] = [];
	const usersRef = collection(db, DATABASES.users);
	const usersQuery = userName
		? query(usersRef, where('displayName', '==', userName))
		: query(usersRef);
	const querySnapshot = await getDocs(usersQuery);
	querySnapshot.forEach((document) => result.push(document.data()));
	return result;
};
