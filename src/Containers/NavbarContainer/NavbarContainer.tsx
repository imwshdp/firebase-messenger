import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { auth } from '@Config';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { useAuth } from '@Shared/hooks/useAuth';
import { removeUser } from '@Store/slices/user';

import { Navbar } from '@Components';

const NavbarContainer: FC = () => {
	const currentUser = useAppSelector((state) => state.user);

	const { isAuth } = useAuth();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const handleLogout = () => {
		auth.signOut();
		dispatch(removeUser());
		navigate('login');
	};

	return (
		<Navbar user={currentUser}>
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
