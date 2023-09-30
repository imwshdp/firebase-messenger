import { FC } from 'react';

import { MAX_CHAT_VIEW_PANEL_HEIGHT } from '@Shared/content/constants';
import { IconOfSend } from '@Shared/content/Icons';

import { ButtonWithIcon, TextArea } from '@Components';

import styles from './NewMessageView.module.scss';

interface PropsType {
	value: string;
	setValue: (value: string) => void;
}

const NewMessageView: FC<PropsType> = ({ value, setValue }) => {
	return (
		<>
			<TextArea
				value={value}
				setValue={setValue}
				type={'transparent'}
				resizable
				maxHeight={MAX_CHAT_VIEW_PANEL_HEIGHT}
			/>

			<ButtonWithIcon className={styles['submit']} icon={<IconOfSend />} onClick={() => {}} />
		</>
	);
};

export default NewMessageView;
