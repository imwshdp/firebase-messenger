import { FC, ReactNode, useState } from 'react';

import clsx from 'clsx';

import { IconOfArrow, IconOfUser } from '@Shared/content/icons';
import { User } from '@Shared/model';

import { ButtonWithIcon } from '@Components';

import styles from './Navbar.module.scss';

interface PropsType {
	children: ReactNode;
	user: User;
}

const Navbar: FC<PropsType> = ({ children, user }) => {
	const { displayName, photoURL } = user;

	const [isCollapsed, setIsCollapsed] = useState(false);

	const handleCloseClick = () => setIsCollapsed((previousIsCollapsed) => !previousIsCollapsed);

	return (
		<nav
			className={clsx(styles['navbar'], {
				[styles['navbar_collapsed']]: isCollapsed,
			})}
		>
			<>
				{children}
				{displayName && <span>{displayName}</span>}
				{photoURL ? (
					<img
						className={styles['navbar__profile-picture']}
						src={photoURL}
						alt='User Profile Photo'
					/>
				) : (
					<IconOfUser
						className={clsx(
							styles['navbar__profile-picture'],
							styles['navbar__profile-picture__icon'],
						)}
					/>
				)}
				<ButtonWithIcon
					icon={<IconOfArrow />}
					onClick={handleCloseClick}
					className={clsx(styles['navbar__button'], {
						[styles['navbar__button-rotated']]: isCollapsed,
					})}
				/>
			</>
		</nav>
	);
};

export default Navbar;
