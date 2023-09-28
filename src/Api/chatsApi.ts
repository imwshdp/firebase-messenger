import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

import { db } from '@Config';
import { DATABASES } from '@Shared/content/constants';
import { OpenChatWithUserRequestParamsType } from '@Shared/model';

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
		console.log('зашли в создание');
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

	console.log('скипнули создание');
};
