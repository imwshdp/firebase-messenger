import { FC, ReactNode, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');

interface PropsType {
	children: ReactNode;
	closeModal: () => void;
}

const Modal: FC<PropsType> = ({ children, closeModal }) => {
	const element = useMemo(() => document.createElement('div'), []);

	useEffect(() => {
		modalRoot!.appendChild(element);
		return () => {
			modalRoot!.removeChild(element);
		};
	}, [element]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && closeModal) {
				closeModal();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	return createPortal(
		<div className={styles['container']} onClick={closeModal}>
			<div className={styles['container__modal']}>{children}</div>
		</div>,
		element,
	);
};

export default Modal;
