import { FC, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { IconOfFile, IconOfTrash } from '@Shared/content/icons.ts';

import styles from './FileThumbnail.module.scss';

interface PropsType {
	url: string;
	file: File;
	deleteFile: () => void;
}

const FileThumbnail: FC<PropsType> = ({ url, file, deleteFile }) => {
	const filename = file.name;
	const type = file.type.slice(0, file.type.indexOf('/'));

	const filePreview = () => {
		switch (type) {
			case 'image':
				return <img className={styles['thumbnail__image']} src={url} alt={filename} />;
			default:
				return (
					<div className={styles['thumbnail__file']} title={filename}>
						<IconOfFile />
					</div>
				);
		}
	};

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
			{filePreview()}

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
