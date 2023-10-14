import { forwardRef } from 'react';

import useAppDispatch from '@Shared/hooks/useAppDispatch';
import { Message } from '@Shared/model';
import { openModalWithIndex, setModalUrls } from '@Store/slices/modal';

import { MessageView } from '@Components';

interface PropsType {
	message: Message;
	isMyMessage: boolean;
	photoURL: string | null;
}

const MessageViewContainer = forwardRef<HTMLDivElement, PropsType>(
	function MessageViewContainer(props, ref) {
		const dispatch = useAppDispatch();

		const handleOpenModal = (activeUrlIndex: number) => {
			if (props.message.files) {
				dispatch(setModalUrls(props.message.files));
				dispatch(openModalWithIndex(activeUrlIndex));
			}
		};

		return <MessageView {...props} openModal={handleOpenModal} ref={ref} />;
	},
);

export default MessageViewContainer;
