import { forwardRef } from 'react';

import clsx from 'clsx';

import { TABLET_BREAKPOINT } from '@Shared/content/constants';
import { IconOfFile } from '@Shared/content/icons';
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
	const isDesktop = document.body.clientWidth > TABLET_BREAKPOINT;

	const renderFile = (fileURL: string, index: number) => {
		const isImage = fileURL.includes('.image');
		if (isImage) {
			return (
				<img
					className={styles['wrapper__message__content__files__image']}
					key={fileURL}
					src={fileURL}
					alt='File'
					onClick={() => openModal(index)}
				/>
			);
		} else {
			return (
				<a
					key={fileURL}
					href={fileURL}
					title={fileURL}
					className={styles['wrapper__message__content__files__file']}
				>
					<IconOfFile />
				</a>
			);
		}
	};

	return (
		<div
			className={clsx(styles['wrapper'], {
				[styles['wrapper_justified-to-right']]: isMyMessage,
			})}
			ref={ref}
		>
			<div className={styles['wrapper__message']}>
				{isDesktop && !isMyMessage && (
					<ProfilePicture
						photoURL={photoURL}
						className={styles['wrapper__message__profile-picture']}
					/>
				)}

				<div className={styles['wrapper__message__content']}>
					<span>{message.text}</span>
					<div
						className={clsx(styles['wrapper__message__content__files'], {
							[styles['wrapper__message__content__files_four_grid']]:
								message.files && message.files.length == 4,
							[styles['wrapper__message__content__files_three_grid']]:
								message.files && message.files.length == 3,
						})}
					>
						{message.files?.map((file, index) => renderFile(file, index))}
					</div>
					<i className={styles['wrapper__message__content__date']}>{message.date}</i>
				</div>

				{isDesktop && isMyMessage && (
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
