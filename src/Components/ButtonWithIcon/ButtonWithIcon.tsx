import { FC, MouseEvent, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './ButtonWithIcon.module.scss';

interface PropsType {
	icon: ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	title?: string;
	className?: string;
}

const ButtonWithIcon: FC<PropsType> = ({ icon, onClick, disabled, title, className }) => {
	const handlePreventedClick = (event: MouseEvent) => {
		event.preventDefault();
		if (onClick) onClick();
	};

	return (
		<button
			type='button'
			title={title}
			className={clsx(
				styles['button'],
				{
					[styles['button_disabled']]: disabled,
				},
				className,
			)}
			onClick={handlePreventedClick}
			disabled={disabled}
		>
			{icon}
		</button>
	);
};

export default ButtonWithIcon;
