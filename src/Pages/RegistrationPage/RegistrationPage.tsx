import { FC } from 'react';

import { FormOfRegistrationContainer } from '@Containers';

import styles from './RegistrationPage.module.scss';

const RegistrationPage: FC = () => {
	return (
		<section className={styles['page_wrapper']}>
			<FormOfRegistrationContainer />
		</section>
	);
};

export default RegistrationPage;
