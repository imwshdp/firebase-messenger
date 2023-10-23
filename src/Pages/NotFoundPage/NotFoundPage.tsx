import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

const NotFoundPage: FC = () => {
	const navigate = useNavigate();

	return (
		<div className={styles['page']}>
			<h1 className={styles['page__error']}>404</h1>
			<h2 className={styles['page__message']}>Страница не найдена...😢</h2>
			<a onClick={() => navigate(-1)}>Вернуться</a>
		</div>
	);
};

export default NotFoundPage;
