import { forwardRef } from 'react';

import clsx from 'clsx';

import { Message } from '@Shared/model';

import { ProfilePicture } from '@Components';

import styles from './MessageView.module.scss';

interface PropsType {
	message: Message;
	isMyMessage: boolean;
	photoURL: string | null;

	openModal: (index: number) => void;
}

const MessageView = forwardRef<HTMLDivElement, PropsType>(function MessageView(
	{ message, isMyMessage, photoURL, openModal },
	ref,
) {
	return (
		<div
			className={clsx(styles['wrapper'], {
				[styles['wrapper_justified-to-right']]: isMyMessage,
			})}
			ref={ref}
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
					<div
						className={clsx(styles['wrapper__message__content__files'], {
							[styles['wrapper__message__content__files_column_grid']]:
								message.files && message.files.length == 4,
							[styles['wrapper__message__content__files_row_grid']]:
								message.files && message.files.length == 3,
						})}
					>
						{message.files?.map((file, index) => (
							<img
								className={styles['wrapper__message__content__files__file']}
								key={file}
								src={file}
								alt='File'
								onClick={() => openModal(index)}
							/>
						))}
					</div>
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
});

export default MessageView;
