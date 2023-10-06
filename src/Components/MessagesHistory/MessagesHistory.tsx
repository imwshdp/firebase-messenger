import { FC } from 'react';

import { useScrollToEnd } from '@Shared/hooks/useScrollToEnd';
import { Message } from '@Shared/model';

import { MessageView } from '@Components';

interface PropsType {
	className?: string;
	messages: Message[];

	chatUserId?: string;
	chatUserPhotoURL?: string | null;
	currentUserId: string;
	currentUserPhotoURL: string | null;
}

const MessagesHistory: FC<PropsType> = ({
	className,
	messages,
	currentUserId,
	currentUserPhotoURL,
	chatUserId,
	chatUserPhotoURL,
}) => {
	const [containerRef] = useScrollToEnd(messages, chatUserId);

	return (
		<div className={className} ref={containerRef}>
			{messages.map((message, index) => {
				const isMessageByCurrentUser = message.senderId === currentUserId;

				return (
					<MessageView
						key={index}
						message={message}
						isMyMessage={isMessageByCurrentUser}
						photoURL={isMessageByCurrentUser ? currentUserPhotoURL : chatUserPhotoURL || null}
					/>
				);
			})}
		</div>
	);
};

export default MessagesHistory;
