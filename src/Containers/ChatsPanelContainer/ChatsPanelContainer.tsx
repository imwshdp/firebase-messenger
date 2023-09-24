import { useEffect, useState } from 'react';

import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import useDebounce from '@Shared/hooks/useDebounce';
import { searchChats } from '@Store/slices/chats';

import { ChatsPanel } from '@Components';

const ChatsPanelContainer = () => {
	const dispatch = useAppDispatch();
	const chats = useAppSelector((state) => state.chats);

	const chatList = chats.chats;
	const isLoading = chats.loading;

	const [searchValue, setSearchValue] = useState('');
	const debouncedSearch = useDebounce(searchValue);

	useEffect(() => {
		dispatch(
			searchChats({
				userName: debouncedSearch,
			}),
		);
	}, [debouncedSearch]);

	const handleSearchOnChange = (value: string) => {
		setSearchValue(value);
	};

	return (
		<ChatsPanel
			searchValue={searchValue}
			setSearchValue={handleSearchOnChange}
			chats={chatList}
			isLoading={isLoading}
		/>
	);
};

export default ChatsPanelContainer;
