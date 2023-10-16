import { FC, useEffect } from 'react';

import clsx from 'clsx';

import { Modal } from '@Components';

import styles from './ModalOfFilesView.module.scss';

interface PropsType {
	urls: string[];
	activeUrlIndex: number;

	openPrevious: () => void;
	isPreviousDisabled: boolean;
	openNext: () => void;
	isNextDisabled: boolean;
	closeModal: () => void;
}

const ModalOfFilesView: FC<PropsType> = ({
	urls,
	activeUrlIndex,
	openNext,
	openPrevious,
	closeModal,
	isNextDisabled,
	isPreviousDisabled,
}) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'ArrowLeft' && !isPreviousDisabled) {
				openPrevious();
			}

			if (event.key === 'ArrowRight' && !isNextDisabled) {
				openNext();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isNextDisabled, isPreviousDisabled, openNext, openPrevious]);

	return (
		<Modal closeModal={closeModal}>
			<div className={styles['container']}>
				<button
					className={clsx(styles['button'], styles['button_left'], {
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
					className={clsx(styles['button'], styles['button_right'], {
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
		</Modal>
	);
};

export default ModalOfFilesView;
