import { FC, useState } from 'react';

import useAppSelector from '@Shared/hooks/useAppSelector';
import { useHandleScrollEnd } from '@Shared/hooks/useHandleScrollEnd';
import { useScrollToEnd } from '@Shared/hooks/useScrollToEnd';

import { ChatView } from '@Components';

const ChatViewContainer: FC = () => {
	const chatUser = useAppSelector((state) => state.messages.user);
	const chatUserId = useAppSelector((state) => state.messages.user?.uid);

	const messages = useAppSelector((state) => state.messages.messages);

	const [isScrollOnBottom, setIsScrollOnBottom] = useState<boolean>(true);

	const { containerRef, triggerScroll } = useScrollToEnd(messages, chatUserId, !isScrollOnBottom);

	useHandleScrollEnd({
		containerRef,
		setIsScrollOnBottom,
	});

	return <ChatView chatUser={chatUser} ref={containerRef} triggerScroll={triggerScroll} />;
};

export default ChatViewContainer;
