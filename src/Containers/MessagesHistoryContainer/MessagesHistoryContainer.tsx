import { forwardRef } from 'react';

import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { useOnSnapshotMessages } from '@Shared/hooks/useOnSnapshotMessages';
import { fetchMessages } from '@Store/slices/messages';

import { MessagesHistory } from '@Components';

interface PropsType {
	className?: string;
}

const MessagesHistoryContainer = forwardRef<HTMLDivElement, PropsType>(
	function MessagesHistoryContainer({ className }, ref) {
		const dispatch = useAppDispatch();

		const messagesList = useAppSelector((state) => state.messages.messages);

		const isAllMessagesLoaded = useAppSelector((state) => state.messages.isAllLoaded);
		const fetchPage = useAppSelector((state) => state.messages.page);

		const chatId = useAppSelector((state) => state.messages.chatId);
		const currentUserId = useAppSelector((state) => state.user.uid);
		const chatUserPhotoURL = useAppSelector((state) => state.messages.user?.photoURL);
		const currentUserPhotoURL = useAppSelector((state) => state.user.photoURL);

		useOnSnapshotMessages({
			chatId,
			page: fetchPage,
		});

		const fetchTopMessages = () => {
			dispatch(
				fetchMessages({
					chatId: chatId!,
					page: fetchPage,
				}),
			);
		};

		return (
			<MessagesHistory
				ref={ref}
				className={className}
				messages={messagesList}
				chatUserPhotoURL={chatUserPhotoURL}
				currentUserId={currentUserId}
				currentUserPhotoURL={currentUserPhotoURL}
				fetchMessages={fetchTopMessages}
				isAllLoaded={isAllMessagesLoaded}
			/>
		);
	},
);

export default MessagesHistoryContainer;
