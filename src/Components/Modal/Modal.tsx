import React, { MouseEvent, ReactNode, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');

interface PropsType {
	closeModal?: () => void;
	children: ReactNode;
}

const Modal: React.FC<PropsType> = ({ closeModal, children }) => {
	const element = useMemo(() => document.createElement('div'), []);
	const modalContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		modalRoot!.appendChild(element);
		return () => {
			modalRoot!.removeChild(element);
		};
	}, [element]);

	const onClick = (e: MouseEvent): void => {
		if (closeModal && e.target === modalContainerRef.current) {
			closeModal();
		}
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && closeModal) {
				closeModal();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [closeModal]);

	return createPortal(
		<div ref={modalContainerRef} onClick={onClick} className={styles['container']}>
			{children}
		</div>,
		element,
	);
};

export default Modal;
