import { FC, MouseEvent } from 'react';

import clsx from 'clsx';

import styles from './Button.module.scss';

interface PropsType {
	title: string;
	onClick?: () => void;
	disabled?: boolean;
}

const Button: FC<PropsType> = ({ onClick, title, disabled }) => {
	const handlePreventedClick = (event: MouseEvent) => {
		event.preventDefault();
		if (onClick) onClick();
	};

	return (
		<button
			type='button'
			className={clsx(styles['button'], {
				[styles['button_enabled']]: !disabled,
			})}
			onClick={handlePreventedClick}
		>
			{title}
		</button>
	);
};

export default Button;
