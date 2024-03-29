import { FC } from 'react';

import { IconOfLoad } from '@Shared/content/icons.ts';

import styles from './MessagesLoader.module.scss';

const MessagesLoader: FC = () => {
	return (
		<div className={styles['loader']}>
			<IconOfLoad className={styles['loader__icon']} />
		</div>
	);
};

export default MessagesLoader;
