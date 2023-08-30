import { useState } from 'react';

import { ChatsPanel } from '@Components';

const ChatsPanelContainer = () => {
	const [searchValue, setSearchValue] = useState('');

	const handleSearchOnChange = (value: string) => {
		setSearchValue(value);
	};

	return <ChatsPanel searchValue={searchValue} setSearchValue={handleSearchOnChange} />;
};

export default ChatsPanelContainer;
