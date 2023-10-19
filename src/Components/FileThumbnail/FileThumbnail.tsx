import { FC, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { IconOfTrash } from '@Shared/content/icons.ts';

import styles from './FileThumbnail.module.scss';

interface PropsType {
	url: string;
	filename: string;
	deleteFile: () => void;
}

const FileThumbnail: FC<PropsType> = ({ url, filename, deleteFile }) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	const handleMouseLeave = () => setIsHovered(false);
	const handleMouseEnter = () => setIsHovered(true);

	return (
		<motion.div
			className={styles['thumbnail']}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			title={filename}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<img className={styles['thumbnail__file']} src={url} alt={filename} />

			<AnimatePresence>
				{isHovered && (
					<motion.div
						className={styles['thumbnail__overlay']}
						onClick={deleteFile}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<IconOfTrash />
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default FileThumbnail;
