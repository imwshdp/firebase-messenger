import { FC } from 'react';

import { MAX_CHAT_VIEW_PANEL_HEIGHT } from '@Shared/content/constants';
import { IconOfSend } from '@Shared/content/Icons';

import { ButtonWithIcon, TextArea } from '@Components';

import styles from './ChatView.module.scss';

interface PropsType {
	value: string;
	setValue: (value: string) => void;
}

const ChatView: FC<PropsType> = ({ value, setValue }) => {
	const handleSendMessage = () => {
		setValue('');
	};

	return (
		<section className={styles['chat_view']} id='123'>
			<div className={styles['chat_view__container']}></div>
			<div
				className={styles['chat_view__panel']}
				style={{ maxHeight: 'MAX_CHAT_VIEW_PANEL_HEIGHT - calc(var(--secondary-offset) * 2)' }}
			>
				<TextArea
					value={value}
					setValue={setValue}
					type={'transparent'}
					resizable
					maxHeight={MAX_CHAT_VIEW_PANEL_HEIGHT}
				/>

				<ButtonWithIcon
					className={styles['chat_view__panel__submit']}
					icon={<IconOfSend />}
					onClick={handleSendMessage}
				/>
			</div>
		</section>
	);
};

export default ChatView;
