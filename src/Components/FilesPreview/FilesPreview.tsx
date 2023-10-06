import { FC, useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { FileThumbnail } from '@Components';

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

	const imageList: Array<JSX.Element> = urls.map((url, index) => {
		const filename = files[index].name;
		return (
			<FileThumbnail
				url={url}
				key={index}
				filename={filename}
				deleteFile={() => deleteFile(index)}
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
