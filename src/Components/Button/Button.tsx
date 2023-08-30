import { FC, MouseEvent } from 'react';

import styles from './Button.module.scss';

interface PropsType {
	title: string;
	onClick?: () => void;
}

const Button: FC<PropsType> = ({ onClick, title }) => {
	const handlePreventedClick = (event: MouseEvent) => {
		event.preventDefault();
		if (onClick) onClick();
	};

	return (
		<button type='button' className={styles['button']} onClick={handlePreventedClick}>
			{title}
		</button>
	);
};

export default Button;
