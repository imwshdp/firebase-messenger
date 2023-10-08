import { FC } from 'react';

import { motion } from 'framer-motion';

import { IconOfFirebase } from '@Shared/content/icons';

import styles from './Loader.module.scss';

const Loader: FC = () => {
	const animationTransition = {
		duration: 2,
		times: [0, 0.2, 0.5, 0.8, 1],
		repeat: Infinity,
		repeatDelay: 1,
	};

	return (
		<div className={styles['wrapper']}>
			<motion.div
				className={styles['wrapper__loader']}
				animate={{
					scale: [1, 2, 2, 1, 1],
					rotate: [0, 0, 270, 270, 0],
					borderRadius: ['20%', '20%', '50%', '50%', '20%'],
				}}
				transition={animationTransition}
			/>
			<motion.div
				animate={{
					scale: [1, 2, 2, 1, 1],
				}}
				transition={animationTransition}
				className={styles['wrapper__logo']}
			>
				<IconOfFirebase className={styles['wrapper__logo__icon']} />
			</motion.div>
		</div>
	);
};

export default Loader;
