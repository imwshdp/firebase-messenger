import { FC } from 'react';

import { FormOfLoginContainer } from '@Containers';

import styles from './LoginPage.module.scss';

const LoginPage: FC = () => {
	return (
		<section className={styles['page_wrapper']}>
			<FormOfLoginContainer />
		</section>
	);
};

export default LoginPage;
