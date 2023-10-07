import { FC } from 'react';

import styles from './Loader.module.scss';

const Loader: FC = () => {
	return (
		<div className={styles['wrapper']}>
			<span className={styles['wrapper__loader']}>Загрузка ...</span>
		</div>
	);
};

export default Loader;
