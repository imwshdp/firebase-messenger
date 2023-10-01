import { ChangeEvent, FC } from 'react';

import { IconOfFiles } from '@Shared/content/icons';

import styles from './FileAttacher.module.scss';

interface PropsType {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileAttacher: FC<PropsType> = ({ onChange }) => {
	return (
		<label className={styles['file-attacher']} title='Attach files'>
			<input className={styles['file-attacher__input']} type='file' multiple onChange={onChange} />
			<IconOfFiles />
		</label>
	);
};

export default FileAttacher;
