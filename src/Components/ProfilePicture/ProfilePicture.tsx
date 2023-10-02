import { FC } from 'react';

import clsx from 'clsx';

import { IconOfUser } from '@Shared/content/icons';

import styles from './ProfilePicture.module.scss';

interface PropsType {
	photoURL?: string | null;
	title?: string;
	className?: string;
}

const ProfilePicture: FC<PropsType> = ({ photoURL, title, className }) => {
	return (
		<div className={className}>
			{photoURL ? (
				<img
					className={styles['profile-picture']}
					src={photoURL}
					alt='User profile picture'
					title={title}
				/>
			) : (
				<div title={title}>
					<IconOfUser
						className={clsx(styles['profile-picture'], styles['profile-picture__icon'])}
					/>
				</div>
			)}
		</div>
	);
};

export default ProfilePicture;
