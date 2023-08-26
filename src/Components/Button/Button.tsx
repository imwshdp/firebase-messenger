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
		<button className={styles['button']} onClick={handlePreventedClick}>
			{title}
		</button>
	);
};

export default Button;

// import { FC } from 'react';
// import { Button as AntDButton, Space } from 'antd';
// import type { SizeType } from 'antd/es/config-provider/SizeContext';

// // import styles from './Button.module.scss';

// type ButtonSizeType = SizeType;

// interface PropsType {
// 	title: string;
// 	onClick?: () => void;
// 	size?: ButtonSizeType;
// }

// const Button: FC<PropsType> = ({ onClick, title, size = 'middle' }) => {
// 	return (
// 		<Space wrap>
// 			<AntDButton type='primary' size={size} onClick={onClick}>
// 				{title}
// 			</AntDButton>
// 		</Space>
// 	);
// };

// export default Button;
