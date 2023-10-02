import { FC } from 'react';

import { ProfilePicture } from '@Components';

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
			<ProfilePicture photoURL={photoURL} title={displayName} />
			<div className={styles['chat__user-info']}>
				<span>{displayName}</span>
				{lastMessage && <i className={styles['chat__user-info__message']}>{lastMessage.text}</i>}
			</div>
		</div>
	);
};

export default ChatLink;
