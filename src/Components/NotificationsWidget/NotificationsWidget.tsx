import { FC } from 'react';

import { IconOfAttention, IconOfCancel } from '@Shared/content/icons';
import { ErrorState } from '@Shared/model';

import { ButtonWithIcon } from '@Components';

import styles from './NotificationsWidget.module.scss';

interface PropsType {
	errors: ErrorState[];
	onClose: (index: number) => void;
}

const NotificationsWidget: FC<PropsType> = ({ errors, onClose }) => {
	return (
		<div className={styles['container']}>
			{errors.map((error, index) => (
				<div className={styles['container__notification']} key={index}>
					<aside className={styles['container__notification__aside']}>
						<IconOfAttention />
					</aside>
					<div className={styles['container__notification__content']}>
						<div className={styles['container__notification__content__text']}>
							<span>
								Ошибка <b>{error.code}</b>
							</span>

							<span className={styles['container__notification__content__text__message']}>
								{error.message}
							</span>
						</div>
						<ButtonWithIcon icon={<IconOfCancel />} onClick={() => onClose(index)} />
					</div>
				</div>
			))}
		</div>
	);
};

export default NotificationsWidget;
