import { useState } from 'react';

import { ChatView } from '@Components';

const ChatViewContainer = () => {
	const [value, setValue] = useState(''); // TODO use store

	const handleSetValue = (newValue: string) => {
		setValue(newValue);
	};

	return <ChatView value={value} setValue={handleSetValue} />;
};

export default ChatViewContainer;
