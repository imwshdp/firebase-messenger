import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import clsx from 'clsx';

import { RoutesLinks } from '@Router';
import { COLOR_SCHEMES, TABLET_BREAKPOINT } from '@Shared/content/constants';
import { IconOfArrow, IconOfAuth, IconOfMenu } from '@Shared/content/icons.ts';
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

	toggleMenuModal: () => void;
}

const Navbar: FC<PropsType> = ({
	user,
	isAuth,
	isNavbarCollapsed,
	toggleNavbar,
	colorScheme,
	toggleColorScheme,
	handleLogout,
	toggleMenuModal,
}) => {
	const navigate = useNavigate();

	const { displayName, photoURL } = user;

	const isDesktop = document.body.clientWidth > TABLET_BREAKPOINT;

	const logoutClick = () => {
		handleLogout();
		navigate(RoutesLinks.login);
	};

	const loginClick = () => {
		navigate(RoutesLinks.login);
	};

	const loginLink = isDesktop ? (
		isNavbarCollapsed ? (
			<ButtonWithIcon icon={<IconOfAuth className={styles['icon_link']} />} onClick={loginClick} />
		) : (
			<NavLink to='login'>Войти</NavLink>
		)
	) : (
		<ButtonWithIcon icon={<IconOfAuth className={styles['icon_link']} />} onClick={loginClick} />
	);

	const logoutLink = isDesktop ? (
		isNavbarCollapsed ? (
			<ButtonWithIcon
				icon={
					<IconOfAuth
						className={clsx(styles['icon_link'], {
							[styles['icon_link_logout']]: isAuth,
						})}
					/>
				}
				onClick={logoutClick}
			/>
		) : (
			<NavLink to='login' onClick={handleLogout}>
				Выйти
			</NavLink>
		)
	) : (
		<ButtonWithIcon
			icon={
				<IconOfAuth
					className={clsx(styles['icon_link'], {
						[styles['icon_link_logout']]: isAuth,
					})}
				/>
			}
			onClick={logoutClick}
		/>
	);

	return (
		<nav
			className={clsx(styles['navbar'], {
				[styles['navbar_collapsed']]: isNavbarCollapsed,
			})}
		>
			<>
				{isAuth ? logoutLink : loginLink}

				{isDesktop && !isNavbarCollapsed && displayName && (
					<span className={styles['navbar__name']}>{displayName}</span>
				)}

				<ProfilePicture photoURL={photoURL} title={displayName} />

				<ButtonWithIcon
					icon={<IconOfArrow />}
					onClick={toggleNavbar}
					className={clsx(styles['navbar__button'], {
						[styles['navbar__button-rotated']]: isNavbarCollapsed,
					})}
				/>

				<ThemeSwitcher colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} />

				<ButtonWithIcon
					icon={<IconOfMenu />}
					onClick={toggleMenuModal}
					className={styles['navbar__menu']}
				/>
			</>
		</nav>
	);
};

export default Navbar;
