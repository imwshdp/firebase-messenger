import { FC } from 'react';

import styles from './NotFoundPage.module.scss';

const NotFoundPage: FC = () => {
	return (
		<div className={styles['page']}>
			<h1 className={styles['page__error']}>404</h1>
			<h2 className={styles['page__message']}>Страница не найдена...😢</h2>
		</div>
	);
};

export default NotFoundPage;
