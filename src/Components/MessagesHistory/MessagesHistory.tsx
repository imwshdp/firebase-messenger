import { forwardRef } from 'react';

import { Message } from '@Shared/model';

import { MessageView } from '@Components';

interface PropsType {
	className?: string;
	messages: Message[];

	chatUserPhotoURL?: string | null;
	currentUserId: string;
	currentUserPhotoURL: string | null;
}

const MessagesHistory = forwardRef<HTMLDivElement, PropsType>(function MessagesHistory(
	{ className, messages, currentUserId, currentUserPhotoURL, chatUserPhotoURL },
	ref,
) {
	return (
		<div className={className} ref={ref}>
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
});

export default MessagesHistory;
