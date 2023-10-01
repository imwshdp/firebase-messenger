import { FC } from 'react';

import { Message } from '@Shared/model';

import styles from './MessageView.module.scss';

interface PropsType {
	message: Message;
}

const MessageView: FC<PropsType> = ({ message }) => {
	return (
		<div className={styles['message']}>
			<div>{message.text}</div>
			{message.files?.map((file) => (
				<img className={styles['message__file']} key={file} src={file} alt='File' />
			))}
		</div>
	);
};

export default MessageView;
