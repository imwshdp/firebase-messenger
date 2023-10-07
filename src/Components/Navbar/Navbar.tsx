import { FC, ReactNode } from 'react';

import clsx from 'clsx';

import { COLOR_SCHEMES } from '@Shared/content/constants';
import { IconOfArrow } from '@Shared/content/icons';
import { User } from '@Shared/model';

import { ButtonWithIcon, ProfilePicture, ThemeSwitcher } from '@Components';

import styles from './Navbar.module.scss';

interface PropsType {
	children: ReactNode;
	user: User;

	isNavbarCollapsed: boolean;
	toggleNavbar: () => void;

	colorScheme: COLOR_SCHEMES;
	toggleColorScheme: () => void;
}

const Navbar: FC<PropsType> = ({
	children,
	user,
	isNavbarCollapsed,
	toggleNavbar,
	colorScheme,
	toggleColorScheme,
}) => {
	const { displayName, photoURL } = user;

	return (
		<nav
			className={clsx(styles['navbar'], {
				[styles['navbar_collapsed']]: isNavbarCollapsed,
			})}
		>
			<>
				{children}
				{displayName && <span>{displayName}</span>}
				<ProfilePicture photoURL={photoURL} title={displayName} />
				<ButtonWithIcon
					icon={<IconOfArrow />}
					onClick={toggleNavbar}
					className={clsx(styles['navbar__button'], {
						[styles['navbar__button-rotated']]: isNavbarCollapsed,
					})}
				/>

				<ThemeSwitcher colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} />
			</>
		</nav>
	);
};

export default Navbar;
