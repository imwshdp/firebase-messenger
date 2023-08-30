import { FC, MouseEvent, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './ButtonWithIcon.module.scss';

interface PropsType {
	icon: ReactNode;
	onClick?: () => void;
	className?: string;
}

const ButtonWithIcon: FC<PropsType> = ({ icon, onClick, className }) => {
	const handlePreventedClick = (event: MouseEvent) => {
		event.preventDefault();
		if (onClick) onClick();
	};

	return (
		<button
			type='button'
			className={clsx(styles['button'], className)}
			onClick={handlePreventedClick}
		>
			{icon}
		</button>
	);
};

export default ButtonWithIcon;
