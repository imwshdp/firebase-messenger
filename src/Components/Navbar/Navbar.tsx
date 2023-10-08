import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import { COLOR_SCHEMES } from '@Shared/content/constants';
import { IconOfArrow, IconOfAuth } from '@Shared/content/icons';
import { User } from '@Shared/model';

import { ButtonWithIcon, ProfilePicture, ThemeSwitcher } from '@Components';

import styles from './Navbar.module.scss';

interface PropsType {
	user: User;
	isAuth: boolean;

	isNavbarCollapsed: boolean;
	toggleNavbar: () => void;

	colorScheme: COLOR_SCHEMES;
	toggleColorScheme: () => void;
	handleLogout: () => void;
}

const Navbar: FC<PropsType> = ({
	user,
	isAuth,
	isNavbarCollapsed,
	toggleNavbar,
	colorScheme,
	toggleColorScheme,
	handleLogout,
}) => {
	const { displayName, photoURL } = user;

	const loginLink = isNavbarCollapsed ? (
		<NavLink to='login'>
			<IconOfAuth className={styles['icon_link']} />
		</NavLink>
	) : (
		<NavLink to='login'>Войти</NavLink>
	);

	const logoutLink = isNavbarCollapsed ? (
		<NavLink to='login' onClick={handleLogout}>
			<IconOfAuth
				className={clsx(styles['icon_link'], {
					[styles['icon_link_logout']]: isAuth,
				})}
			/>
		</NavLink>
	) : (
		<NavLink to='login' onClick={handleLogout}>
			Выйти
		</NavLink>
	);

	return (
		<nav
			className={clsx(styles['navbar'], {
				[styles['navbar_collapsed']]: isNavbarCollapsed,
			})}
		>
			<>
				{isAuth ? logoutLink : loginLink}

				{!isNavbarCollapsed && displayName && <span className={styles['name']}>{displayName}</span>}

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
