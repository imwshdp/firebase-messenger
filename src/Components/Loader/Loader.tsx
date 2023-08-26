import { FC } from 'react';

import styles from './Loader.module.scss';

const Loader: FC = () => {
	return <span className={styles['loader']}>Загрузка ...</span>;
};

export default Loader;
