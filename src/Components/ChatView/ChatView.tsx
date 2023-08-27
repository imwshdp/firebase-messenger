import { FC, useState } from 'react';

import { MAX_CHAT_VIEW_PANEL_HEIGHT } from '@Shared/content/constants';

import { TextArea } from '@Components';

import styles from './ChatView.module.scss';

const ChatView: FC = () => {
	const [value, setValue] = useState('');

	return (
		<section className={styles['chat_view']} id='123'>
			<div className={styles['chat_view__container']}></div>
			<div
				className={styles['chat_view__panel']}
				style={{ maxHeight: 'MAX_CHAT_VIEW_PANEL_HEIGHT - calc(var(--secondary-padding) * 2)' }}
			>
				<TextArea
					value={value}
					setValue={setValue}
					type={'transparent'}
					resizable
					maxHeight={MAX_CHAT_VIEW_PANEL_HEIGHT}
				/>

				<div className={styles['chat_view__panel__submit']} />
			</div>
		</section>
	);
};

export default ChatView;
