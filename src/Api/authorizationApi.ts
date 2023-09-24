import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
	UserCredential,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore/lite';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { auth, db, storage } from '@Config';
import { LoginRequestParamsType, RegistrationRequestParamsType } from '@Shared/model';

interface SetDocUser {
	uid: string;
	displayName: string;
	email: string;
	photoURL?: string;
}

export const registerNewUser = async ({
	email,
	password,
	displayName,
	profilePicture,
}: RegistrationRequestParamsType): Promise<void> => {
	const response = await createUserWithEmailAndPassword(auth, email, password);

	// TODO handle errors
	const { user } = response;

	const userData: SetDocUser = {
		uid: user.uid,
		displayName,
		email,
	};

	if (profilePicture) {
		const date = new Date().getTime();
		const storageRef = ref(storage, `${displayName + date}`);

		await uploadBytesResumable(storageRef, profilePicture);

		const photoURL = await getDownloadURL(storageRef);

		await updateProfile(user, {
			displayName,
			photoURL,
		});

		userData.photoURL = photoURL;
	} else {
		await updateProfile(user, {
			displayName,
		});
	}

	// create user in firestore
	await setDoc(doc(db, 'users', user.uid), userData);

	// create empty user chats in firestore
	await setDoc(doc(db, 'userChats', user.uid), {});
};

export const loginWithEmailPassword = async ({
	email,
	password,
}: LoginRequestParamsType): Promise<UserCredential> => {
	return await signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async (): Promise<UserCredential> => {
	return await signInWithPopup(auth, new GoogleAuthProvider());
};
