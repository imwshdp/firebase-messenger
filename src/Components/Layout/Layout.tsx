import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { NavbarContainer } from '@Containers';

import styles from './Layout.module.scss';

const Layout: FC = () => {
	return (
		<div className={styles['app']}>
			<aside className={styles['app__aside']}>
				<NavbarContainer />
			</aside>
			<main className={styles['app__main']}>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
