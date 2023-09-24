import { useEffect, useState } from 'react';

import useAppSelector from '@Shared/hooks/useAppSelector';
import useDebounce from '@Shared/hooks/useDebounce';

import { ChatsPanel } from '@Components';

const ChatsPanelContainer = () => {
	const chats = useAppSelector((state) => state.chats.chats);

	const [searchValue, setSearchValue] = useState('');
	const debouncedSearch = useDebounce(searchValue);

	useEffect(() => {}, [debouncedSearch]);

	const handleSearchOnChange = (value: string) => {
		setSearchValue(value);
	};

	return (
		<ChatsPanel searchValue={searchValue} setSearchValue={handleSearchOnChange} chats={chats} />
	);
};

export default ChatsPanelContainer;
