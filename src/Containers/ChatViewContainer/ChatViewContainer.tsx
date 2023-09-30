import { FC } from 'react';

import useAppSelector from '@Shared/hooks/useAppSelector';

import { ChatView } from '@Components';

const ChatViewContainer: FC = () => {
	const chatUser = useAppSelector((state) => state.messages.user);

	return <ChatView chatUser={chatUser} />;
};

export default ChatViewContainer;
