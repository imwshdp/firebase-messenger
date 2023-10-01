import { ChangeEvent, FC } from 'react';

import { MAX_CHAT_VIEW_PANEL_HEIGHT } from '@Shared/content/constants';
import { IconOfSend } from '@Shared/content/icons';

import { ButtonWithIcon, FileAttacher, TextArea } from '@Components';

interface PropsType {
	text: string;

	setText: (value: string) => void;
	setFiles: (event: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: () => void;
}

const NewMessageView: FC<PropsType> = ({ text, setText, setFiles, onSubmit }) => {
	return (
		<>
			<TextArea
				value={text}
				setValue={setText}
				type={'transparent'}
				resizable
				maxHeight={MAX_CHAT_VIEW_PANEL_HEIGHT}
			/>

			<FileAttacher onChange={setFiles} />

			<ButtonWithIcon icon={<IconOfSend />} onClick={onSubmit} />
		</>
	);
};

export default NewMessageView;
