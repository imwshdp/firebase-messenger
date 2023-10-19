import { ChangeEvent, FC } from 'react';

import clsx from 'clsx';

import { IconOfFiles } from '@Shared/content/icons.ts';

import styles from './FileAttacher.module.scss';

interface PropsType {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
}

const FileAttacher: FC<PropsType> = ({ onChange, disabled = false }) => {
	return (
		<label
			className={clsx(styles['file-attacher'], {
				[styles['file-attacher_disabled']]: disabled,
			})}
			title='Attach files'
		>
			<input
				className={styles['file-attacher__input']}
				type='file'
				multiple
				onChange={onChange}
				disabled={disabled}
			/>
			<IconOfFiles />
		</label>
	);
};

export default FileAttacher;
