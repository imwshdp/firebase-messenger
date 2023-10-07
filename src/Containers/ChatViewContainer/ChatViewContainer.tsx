import { FC } from 'react';

import useAppSelector from '@Shared/hooks/useAppSelector';
import { useScrollToEnd } from '@Shared/hooks/useScrollToEnd';

import { ChatView } from '@Components';

const ChatViewContainer: FC = () => {
	const chatUser = useAppSelector((state) => state.messages.user);
	const messages = useAppSelector((state) => state.messages.messages);
	const chatUserId = useAppSelector((state) => state.messages.user?.uid);

	const { containerRef, triggerScroll } = useScrollToEnd(messages, chatUserId);

	return <ChatView chatUser={chatUser} ref={containerRef} triggerScroll={triggerScroll} />;
};

export default ChatViewContainer;
