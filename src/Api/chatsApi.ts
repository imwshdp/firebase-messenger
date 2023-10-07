import {
	arrayUnion,
	collection,
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';

import { db, storage } from '@Config';
import { DATABASES } from '@Shared/content/constants';
import { getCombinedId } from '@Shared/helpers/getCombinedId';
import {
	OpenChatWithUserRequestParamsType,
	SendMessageRequestParamsType,
	UpdateChatRequestParamsType,
} from '@Shared/model';

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

	const combinedId = getCombinedId(currentUserId, chatUserId);

	const chatsRef = collection(db, DATABASES.chats);
	const response = await getDoc(doc(chatsRef, combinedId));

	// create chat history and userChat for both users if chat doesn't exist yet
	if (!response.exists()) {
		await setDoc(doc(chatsRef, combinedId), {
			messages: [],
		});

		const userChatsRef = collection(db, DATABASES.userChats);
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

export const sendMessage = async ({
	chatId,
	messageText,
	messageFiles,
	senderId,
	date,
}: SendMessageRequestParamsType) => {
	if (messageFiles.length) {
		const filesURL = [];

		for (const messageFile of messageFiles) {
			const storageRef = ref(storage, v4());
			await uploadBytesResumable(storageRef, messageFile);
			const fileURL = await getDownloadURL(storageRef);
			filesURL.push(fileURL);
		}

		await updateDoc(doc(db, DATABASES.chats, chatId), {
			messages: arrayUnion({
				uid: v4(),
				text: messageText,
				files: filesURL,
				senderId,
				date,
			}),
		});
	} else {
		await updateDoc(doc(db, DATABASES.chats, chatId), {
			messages: arrayUnion({
				uid: v4(),
				text: messageText,
				senderId,
				date,
			}),
		});
	}
};

export const updateChat = async ({
	senderId,
	userId,
	chatId,
	text,
}: UpdateChatRequestParamsType) => {
	await updateDoc(doc(db, DATABASES.userChats, senderId), {
		[`${chatId}.lastMessage`]: { text },
		[`${chatId}.date`]: serverTimestamp(),
	});

	await updateDoc(doc(db, DATABASES.userChats, userId), {
		[`${chatId}.lastMessage`]: { text },
		[`${chatId}.date`]: serverTimestamp(),
	});
};
