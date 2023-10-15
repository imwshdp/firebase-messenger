import { FC } from 'react';

import useAppSelector from '@Shared/hooks/useAppSelector';
import { useScrollAtEnd } from '@Shared/hooks/useScrollAtEnd';

import { ChatView } from '@Components';

const ChatViewContainer: FC = () => {
	const chatUser = useAppSelector((state) => state.messages.user);
	const chatUserId = useAppSelector((state) => state.messages.user?.uid);

	const messages = useAppSelector((state) => state.messages.messages);

	const { containerRef, triggerScroll } = useScrollAtEnd(messages, chatUserId);

	return <ChatView chatUser={chatUser} ref={containerRef} triggerScroll={triggerScroll} />;
};

export default ChatViewContainer;
