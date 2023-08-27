import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { auth } from '@Config';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import { useAuth } from '@Shared/hooks/useAuth';
import { removeUser } from '@Store/slices/userSlice';

import { Navbar } from '@Components';

const NavbarContainer: FC = () => {
	const { isAuth } = useAuth();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const handleLogout = () => {
		auth.signOut();
		dispatch(removeUser());
		navigate('login');
	};

	return (
		<Navbar>
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
