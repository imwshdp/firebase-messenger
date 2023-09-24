import { FC } from 'react';

import clsx from 'clsx';

import { IconOfUser } from '@Shared/content/Icons';

import styles from './ChatLink.module.scss';

interface PropsType {
	displayName: string;
	photoURL: string | null;

	onClick: () => void;
}

const ChatLink: FC<PropsType> = ({ displayName, photoURL, onClick }) => {
	return (
		<div className={styles['chat']} onClick={onClick}>
			{photoURL ? (
				<img
					className={styles['chat__profile-picture']}
					src={photoURL}
					alt='User Profile Photo'
					title={displayName}
				/>
			) : (
				<IconOfUser
					className={clsx(styles['chat__profile-picture'], styles['chat__profile-picture__icon'])}
				/>
			)}
			{displayName}
		</div>
	);
};

export default ChatLink;
