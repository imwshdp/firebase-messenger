import { FC, ReactNode, useState } from 'react';

import clsx from 'clsx';

import { IconOfArrow } from '@Shared/content/icons';
import { User } from '@Shared/model';

import { ButtonWithIcon, ProfilePicture, ThemeSwitcher } from '@Components';

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
				<ProfilePicture photoURL={photoURL} title={displayName} />
				<ButtonWithIcon
					icon={<IconOfArrow />}
					onClick={handleCloseClick}
					className={clsx(styles['navbar__button'], {
						[styles['navbar__button-rotated']]: isCollapsed,
					})}
				/>

				<ThemeSwitcher />
			</>
		</nav>
	);
};

export default Navbar;
