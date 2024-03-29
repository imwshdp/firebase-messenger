import { ChangeEvent, FC } from 'react';

import clsx from 'clsx';

import { IconOfFiles } from '@Shared/content/icons.ts';

import styles from './FileUploader.module.scss';

interface PropsType {
	onChange: (file: File) => void;
	placeholder?: string;
	isUploaded: boolean;
}

const FileUploader: FC<PropsType> = ({ onChange, placeholder = 'Add a file', isUploaded }) => {
	const handlerFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			onChange(file);
		}
	};

	return (
		<label
			className={clsx(styles['file-selector'], {
				[styles['file-selector_uploaded']]: isUploaded,
			})}
		>
			<input type='file' className={styles['file-selector__input']} onChange={handlerFileUpload} />
			<IconOfFiles />
			{placeholder}
		</label>
	);
};

export default FileUploader;
