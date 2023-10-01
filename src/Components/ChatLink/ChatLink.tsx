import { FC } from 'react';

import clsx from 'clsx';

import { IconOfUser } from '@Shared/content/icons';

import styles from './ChatLink.module.scss';

interface PropsType {
	displayName: string;
	photoURL: string | null;
	lastMessage?: {
		text: string;
	};
	date?: {
		nanoseconds: string;
		seconds: string;
	};

	onClick: () => void;
}

const ChatLink: FC<PropsType> = ({ displayName, photoURL, onClick, lastMessage, date }) => {
	// TODO date
	console.log('date :>> ', date);

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
			<div className={styles['chat__user-info']}>
				<span>{displayName}</span>
				{lastMessage && <i className={styles['chat__user-info__message']}>{lastMessage.text}</i>}
			</div>
		</div>
	);
};

export default ChatLink;
