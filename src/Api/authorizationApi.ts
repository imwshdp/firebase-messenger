import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
	UserCredential,
} from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { auth, db, storage } from '@Config';
import { DATABASES } from '@Shared/content/constants';
import { LoginRequestParamsType, RegistrationRequestParamsType, User } from '@Shared/model';

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
	const usersRef = collection(db, DATABASES.users);
	await setDoc(doc(usersRef, user.uid), userData);

	// create empty user chats in firestore
	const userChatsRef = collection(db, DATABASES.userChats);
	await setDoc(doc(userChatsRef, user.uid), {});
};

export const loginWithEmailPassword = async ({
	email,
	password,
}: LoginRequestParamsType): Promise<UserCredential> => {
	return await signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async (): Promise<User> => {
	const response = await signInWithPopup(auth, new GoogleAuthProvider());
	const { user } = response;
	const { uid, email, displayName, photoURL } = user;

	const usersRef = collection(db, DATABASES.users);
	const userDoc = await getDoc(doc(usersRef, user.uid));

	if (userDoc.exists()) {
		return {
			email: email!,
			uid: uid,
			displayName: displayName!,
			photoURL: photoURL,
		};
	} else {
		const userData: SetDocUser = {
			uid,
			displayName: displayName!,
			email: email!,
		};

		if (photoURL) {
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
		await setDoc(doc(usersRef, uid), userData);

		// create empty user chats in firestore
		const userChatsRef = collection(db, DATABASES.userChats);
		await setDoc(doc(userChatsRef, uid), {});

		return {
			email: userData.email,
			uid: userData.uid,
			displayName: userData.displayName,
			photoURL: userData.photoURL || null,
		};
	}
};
