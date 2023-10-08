import { FC } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

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
			<AnimatePresence>
				{errors.map((error, index) => (
					<motion.div
						key={index}
						className={styles['container__notification']}
						initial={{ opacity: 0, x: 500 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 500 }}
						transition={{ duration: 0.3 }}
					>
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
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
};

export default NotificationsWidget;
