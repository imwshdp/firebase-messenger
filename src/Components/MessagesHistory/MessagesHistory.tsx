import { forwardRef, useRef } from 'react';

import MessageViewContainer from '@Containers/MessageViewContainer/MessageViewContainer';
import { useIntersectionObserver } from '@Shared/hooks/useIntersectionObserver';
import { Message } from '@Shared/model';

interface PropsType {
	className?: string;
	messages: Message[];

	chatUserPhotoURL?: string | null;
	currentUserId: string;
	currentUserPhotoURL: string | null;

	observerCallback: () => void;
	isUnobserve: boolean;
}

const MessagesHistory = forwardRef<HTMLDivElement, PropsType>(function MessagesHistory(
	{
		className,
		messages,
		currentUserId,
		currentUserPhotoURL,
		chatUserPhotoURL,
		observerCallback,
		isUnobserve,
	},
	ref,
) {
	const observerRef = useRef<HTMLDivElement | null>(null);

	useIntersectionObserver({
		ref: observerRef,
		callback: observerCallback,
		isUnobserve,
	});

	const messagesList = messages.map((message, index) => {
		const isMessageByCurrentUser = message.senderId === currentUserId;

		return (
			<MessageViewContainer
				key={index}
				message={message}
				isMyMessage={isMessageByCurrentUser}
				photoURL={isMessageByCurrentUser ? currentUserPhotoURL : chatUserPhotoURL || null}
			/>
		);
	});

	return (
		<div className={className} ref={ref}>
			{messages.length > 0 && (
				<>
					<div ref={observerRef} style={{ border: '1px solid red' }} />
					{messagesList}
				</>
			)}
		</div>
	);
});

export default MessagesHistory;
