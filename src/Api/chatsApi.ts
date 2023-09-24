import {
	collection,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore/lite';

import { db } from '@Config';
import { DATABASES } from '@Shared/content/constants';
import { FilterChatsRequestParamsType, OpenChatWithUserRequestParamsType } from '@Shared/model';

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
		? query(usersRef, where('dispayName', '==', userName))
		: query(usersRef);
	const querySnapshot = await getDocs(usersQuery);
	querySnapshot.forEach((document) => result.push(document.data()));
	return result;
};

export const openChat = async ({ currentUser, chatUser }: OpenChatWithUserRequestParamsType) => {
	const {
		uid: chatUserId,
		displayName: chatUserDisplayName,
		photoURL: chatUserPhotoURL,
	} = chatUser;

	const {
		uid: currentUserId,
		displayName: currentUserDisplayName,
		photoURL: currentUserPhotoURL,
	} = currentUser;

	const combinedId =
		currentUserId > chatUserId ? currentUserId + chatUserId : chatUserId + currentUserId;

	const chatsRef = collection(db, DATABASES.chats);
	const response = await getDoc(doc(chatsRef, combinedId));

	// create chat history and userChat for both users if chat doesn't exist yet
	if (!response.exists()) {
		await setDoc(doc(chatsRef, combinedId), {
			messages: [],
		});

		const userChatsRef = collection(db, DATABASES.usersChats);
		await updateDoc(doc(userChatsRef, currentUserId), {
			[`${combinedId}.userInfo`]: {
				uid: chatUserId,
				displayName: chatUserDisplayName,
				photoURL: chatUserPhotoURL,
			},

			[`${combinedId}.date`]: serverTimestamp(),
		});

		await updateDoc(doc(userChatsRef, chatUserId), {
			[`${combinedId}.userInfo`]: {
				uid: currentUserId,
				displayName: currentUserDisplayName,
				photoURL: currentUserPhotoURL,
			},

			[`${combinedId}.date`]: serverTimestamp(),
		});
	}
};
