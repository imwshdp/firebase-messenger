import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { auth } from '@Config';
import { ColorSchemes } from '@Shared/content/constants';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { useAuth } from '@Shared/hooks/useAuth';
import { setColorScheme, setNavbarStatus } from '@Store/slices/config';
import { removeUser } from '@Store/slices/user';

import { Navbar } from '@Components';

const NavbarContainer: FC = () => {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector((state) => state.user);

	const isNavbarCollapsed = useAppSelector((state) => state.config.isNavbarCollapsed);
	const toggleNavbar = () => dispatch(setNavbarStatus(!isNavbarCollapsed));

	const colorScheme = useAppSelector((state) => state.config.colorScheme);
	const toggleColorScheme = () =>
		dispatch(
			setColorScheme(colorScheme === ColorSchemes.dark ? ColorSchemes.light : ColorSchemes.dark),
		);

	const { isAuth } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		auth.signOut();
		dispatch(removeUser());
		navigate('login');
	};

	return (
		<Navbar
			user={currentUser}
			isNavbarCollapsed={isNavbarCollapsed}
			toggleNavbar={toggleNavbar}
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			{isAuth ? (
				<NavLink to='login' onClick={handleLogout}>
					Выйти
				</NavLink>
			) : (
				<NavLink to='login'>Войти</NavLink>
			)}
		</Navbar>
	);
};

export default NavbarContainer;
