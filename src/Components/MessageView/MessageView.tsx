import { FC } from 'react';

import clsx from 'clsx';

import { Message } from '@Shared/model';

import { ProfilePicture } from '@Components';

import styles from './MessageView.module.scss';

interface PropsType {
	message: Message;
	isMyMessage: boolean;
	photoURL: string | null;
}

const MessageView: FC<PropsType> = ({ message, isMyMessage, photoURL }) => {
	return (
		<div
			className={clsx(styles['wrapper'], {
				[styles['wrapper_justified-to-right']]: isMyMessage,
			})}
		>
			<div className={styles['wrapper__message']}>
				{!isMyMessage && (
					<ProfilePicture
						photoURL={photoURL}
						className={styles['wrapper__message__profile-picture']}
					/>
				)}

				<div className={styles['wrapper__message__content']}>
					<div>{message.text}</div>
					{message.files?.map((file) => (
						<img
							className={styles['wrapper__message__content__file']}
							key={file}
							src={file}
							alt='File'
						/>
					))}
					<i className={styles['wrapper__message__content__date']}>{message.date}</i>
				</div>

				{isMyMessage && (
					<ProfilePicture
						photoURL={photoURL}
						className={styles['wrapper__message__profile-picture']}
					/>
				)}
			</div>
		</div>
	);
};

export default MessageView;
