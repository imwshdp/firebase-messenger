import {
	addDoc,
	collection,
	DocumentData,
	DocumentReference,
	getDocs,
	QuerySnapshot,
} from 'firebase/firestore/lite';

import { db } from '@Config';
import { IMessage } from '@Shared/types';

export const fetchMessages = async (): Promise<QuerySnapshot<DocumentData, DocumentData>> => {
	const querySnapshot = await getDocs(collection(db, 'messages'));
	return querySnapshot;
};

export const addMessage = async (
	newMessage: IMessage,
): Promise<DocumentReference<DocumentData, DocumentData>> => {
	const docRef = await addDoc(collection(db, 'messages'), newMessage);
	return docRef;
};
