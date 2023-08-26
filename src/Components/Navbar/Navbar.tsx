import { FC, ReactNode } from 'react';

import styles from './Navbar.module.scss';

interface PropsType {
	children: ReactNode;
}

const Navbar: FC<PropsType> = ({ children }) => {
	return <nav className={styles['navbar']}>{children}</nav>;
};

export default Navbar;
