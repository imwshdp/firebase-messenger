import { ChangeEvent, FC } from 'react';

import { IconOfFiles } from '@Shared/content/icons';

import styles from './FileUploader.module.scss';

interface PropsType {
	onChange: (file: File) => void;
	placeholder?: string;
}

const FileUploader: FC<PropsType> = ({ onChange, placeholder = 'Add a file' }) => {
	const handlerFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			onChange(file);
		}
	};

	return (
		<label className={styles['file-selector']}>
			<input type='file' className={styles['file-selector__input']} onChange={handlerFileUpload} />
			<IconOfFiles />
			{placeholder}
		</label>
	);
};

export default FileUploader;
