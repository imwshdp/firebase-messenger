import { forwardRef } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { MessageViewContainer } from '@Containers';
import { Message } from '@Shared/model';

import { MessagesLoader } from '@Components';

import styles from './MessagesHistory.module.scss';
interface PropsType {
	className?: string;
	messages: Message[];

	chatUserPhotoURL?: string | null;
	currentUserId: string;
	currentUserPhotoURL: string | null;

	fetchMessages: () => void;
	isAllLoaded: boolean;
}

const MessagesHistory = forwardRef<HTMLDivElement, PropsType>(function MessagesHistory(
	{
		className,
		messages,
		currentUserId,
		currentUserPhotoURL,
		chatUserPhotoURL,
		fetchMessages,
		isAllLoaded,
	},
	ref,
) {
	const messagesComponents = messages.map((message) => (
		<MessageViewContainer
			key={message.uid}
			message={message}
			isMyMessage={message.senderId === currentUserId}
			photoURL={message.senderId === currentUserId ? currentUserPhotoURL : chatUserPhotoURL || null}
		/>
	));

	const loader = isAllLoaded ? <MessagesLoader /> : <div />;

	return (
		<section className={className} ref={ref}>
			{messages.length > 0 && (
				<InfiniteScroll
					className={styles['container']}
					pageStart={0}
					loadMore={fetchMessages}
					hasMore={!isAllLoaded}
					isReverse
					initialLoad={false}
					loader={loader}
					useWindow={false}
				>
					{messagesComponents}
				</InfiniteScroll>
			)}
		</section>
	);
});

export default MessagesHistory;
