import {
	collection,
	doc,
	endBefore,
	getDoc,
	getDocs,
	limitToLast,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';

import { db, storage } from '@Config';
import { COLLECTIONS, DATABASES, PAGE_MESSAGE_NUMBER } from '@Shared/content/constants';
import { getCombinedId } from '@Shared/helpers/getCombinedId';
import { getParsedDateFromIso } from '@Shared/helpers/getParsedDateFromIso';
import { converter } from '@Shared/helpers/typesConverter';
import {
	FetchMessagesQueryRequestParamsType,
	Message,
	MessageSnapshotResponseType,
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
	const chatSnapshot = await getDoc(doc(chatsRef, combinedId));

	// create chat history and userChat for both users if chat doesn't exist yet
	if (!chatSnapshot.exists()) {
		const userChatsRef = collection(db, DATABASES.userChats);

		await setDoc(doc(chatsRef, combinedId), {});

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
	const newMessageId = Date.now() + v4();
	const newMessageDocRef = doc(db, DATABASES.chats, chatId, COLLECTIONS.messages, newMessageId);

	if (messageFiles.length) {
		const filesURL = [];

		for (const messageFile of messageFiles) {
			const storageRef = ref(storage, v4());
			await uploadBytesResumable(storageRef, messageFile);
			const fileURL = await getDownloadURL(storageRef);
			filesURL.push(fileURL);
		}

		await setDoc(newMessageDocRef, {
			uid: newMessageId,
			text: messageText,
			files: filesURL,
			senderId,
			date,
		});
	} else {
		await setDoc(newMessageDocRef, {
			uid: newMessageId,
			text: messageText,
			senderId,
			date,
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

export const fetchMessages = async ({
	chatId,
	page,
	endBeforeUid,
}: FetchMessagesQueryRequestParamsType) => {
	const messagesCollectionRef = collection(db, DATABASES.chats, chatId, COLLECTIONS.messages);

	const messagesQuery = query(
		messagesCollectionRef,
		orderBy('uid'),
		endBefore(endBeforeUid),
		limitToLast((page + 1) * PAGE_MESSAGE_NUMBER),
	).withConverter(converter<MessageSnapshotResponseType>());

	const snapshotResult: MessageSnapshotResponseType[] = [];

	const querySnapshot = await getDocs(messagesQuery);
	querySnapshot.forEach((document) => snapshotResult.push(document.data()));

	const serializableMessages: Message[] = snapshotResult.map((message) => {
		return {
			...message,
			date: getParsedDateFromIso(message.date.toDate().toISOString()),
		};
	});

	return serializableMessages;
};
