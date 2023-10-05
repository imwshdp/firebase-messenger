import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '@Config';
import { DATABASES } from '@Shared/content/constants';
import { converter } from '@Shared/helpers/typesConverter';
import { FilterChatsRequestParamsType, UserInfo } from '@Shared/model';

export const fetchUsers = async () => {
	const result: UserInfo[] = [];
	const usersRef = collection(db, DATABASES.users);
	const usersQuery = query(usersRef).withConverter(converter<UserInfo>());
	const querySnapshot = await getDocs(usersQuery);
	querySnapshot.forEach((document) => result.push(document.data()));
	return result;
};

export const searchUsers = async ({ userName }: FilterChatsRequestParamsType) => {
	const result: UserInfo[] = [];
	const usersRef = collection(db, DATABASES.users);

	const usersQuery = userName
		? query(usersRef, where('displayName', '==', userName)).withConverter(converter<UserInfo>())
		: query(usersRef).withConverter(converter<UserInfo>());
	const querySnapshot = await getDocs(usersQuery);
	querySnapshot.forEach((document) => result.push(document.data()));
	return result;
};
