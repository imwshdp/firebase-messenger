import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import { NavbarContainer, NotificationsWidgetContainer } from '@Containers';
import { TOOLTIP_ID } from '@Shared/content/constants';

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

			<NotificationsWidgetContainer />

			<Tooltip id={TOOLTIP_ID} className={styles['app__tooltip']} />
		</div>
	);
};

export default Layout;
