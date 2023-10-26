import { ChangeEvent, CSSProperties, FC, useEffect } from 'react';

import { MAX_CHAT_VIEW_PANEL_HEIGHT } from '@Shared/content/constants';
import { IconOfMail } from '@Shared/content/icons.ts';

import { ButtonWithIcon, FileAttacher, TextArea } from '@Components';

interface PropsType {
	text: string;
	setText: (value: string) => void;
	setFiles: (files: FileList | null) => void;

	onSubmit: () => void;
	isSubmitDisabled: boolean;
	isAttachFileDisabled: boolean;

	className?: string;
	style?: CSSProperties;
}

const NewMessageView: FC<PropsType> = ({
	text,
	setText,
	setFiles,
	onSubmit,
	isSubmitDisabled,
	isAttachFileDisabled,
	className,
	style,
}) => {
	const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFiles(event.target.files);
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter' && !event.shiftKey && !isSubmitDisabled) {
				onSubmit();
				setTimeout(() => setText(''));
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isSubmitDisabled, onSubmit]);

	return (
		<div className={className} style={style}>
			<TextArea
				value={text}
				setValue={setText}
				type={'transparent'}
				resizable
				maxHeight={MAX_CHAT_VIEW_PANEL_HEIGHT}
			/>

			<FileAttacher onChange={handleFilesChange} disabled={isAttachFileDisabled} />

			<ButtonWithIcon icon={<IconOfMail />} onClick={onSubmit} disabled={isSubmitDisabled} />
		</div>
	);
};

export default NewMessageView;
