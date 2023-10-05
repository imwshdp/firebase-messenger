import { FC, useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import styles from './FilesPreview.module.scss';

interface PropsType {
	files: File[];
	urls: string[];
	deleteFile: (index: number) => void;
}

const FilesPreview: FC<PropsType> = ({ files, urls, deleteFile }) => {
	const [isVisible, setIsVisible] = useState<boolean>(urls.length > 0);

	useEffect(() => {
		setIsVisible(files.length > 0);
	}, [files]);

	const imageList = urls.map((url, index) => {
		const filename = files[index].name;
		return (
			<img
				className={styles['files-preview__file']}
				src={url}
				key={index}
				alt={filename}
				title={filename}
				onClick={() => deleteFile(index)}
			/>
		);
	});

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: 'auto', opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<div className={styles['files-preview']}>{imageList}</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default FilesPreview;
