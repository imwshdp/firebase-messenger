import { FC } from 'react';
import { createPortal } from 'react-dom';

import clsx from 'clsx';

import styles from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');

interface PropsType {
	urls: string[];
	activeUrlIndex: number;

	openPrevious: () => void;
	isPreviousDisabled: boolean;
	openNext: () => void;
	isNextDisabled: boolean;
	closeModal: () => void;
}

const Modal: FC<PropsType> = ({
	urls,
	activeUrlIndex,
	openNext,
	openPrevious,
	closeModal,
	isNextDisabled,
	isPreviousDisabled,
}) => {
	const modal = (
		<div className={styles['container']}>
			<button
				className={clsx(styles['button'], {
					[styles['button_disabled']]: isPreviousDisabled,
				})}
				onClick={openPrevious}
			>
				<div
					className={clsx(styles['button__icon'], styles['button__icon_rotated'], {
						[styles['button__icon_disabled']]: isPreviousDisabled,
					})}
				/>
			</button>
			<div className={styles['modal']}>
				<img
					className={styles['modal__image']}
					src={urls[activeUrlIndex]}
					alt={urls[activeUrlIndex]}
				/>
			</div>
			<button
				className={clsx(styles['button'], {
					[styles['button_disabled']]: isNextDisabled,
				})}
				onClick={openNext}
			>
				<div
					className={clsx(styles['button__icon'], {
						[styles['button__icon_disabled']]: isNextDisabled,
					})}
				/>
			</button>

			<button className={styles['close_modal']} onClick={closeModal}>
				<div className={styles['close_modal__icon']} />
			</button>
		</div>
	);

	return createPortal(modal, modalRoot!);
};

export default Modal;
