import { FC } from 'react';

import { ProfilePicture } from '@Components';

import styles from './ChatLink.module.scss';

interface PropsType {
	displayName: string;
	photoURL: string | null;
	lastMessage?: {
		text: string;
	};

	onClick: () => void;
}

const ChatLink: FC<PropsType> = ({ displayName, photoURL, onClick, lastMessage }) => {
	return (
		<div className={styles['chat']} onClick={onClick}>
			<ProfilePicture photoURL={photoURL} title={displayName} />
			<div className={styles['chat__user_info']}>
				<span className={styles['chat__user_info__userName']}>{displayName}</span>
				{lastMessage && <i className={styles['chat__user_info__message']}>{lastMessage.text}</i>}
			</div>
		</div>
	);
};

export default ChatLink;
