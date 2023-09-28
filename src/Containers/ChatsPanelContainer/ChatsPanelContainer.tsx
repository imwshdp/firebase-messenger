import { useEffect, useState } from 'react';

import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import useDebounce from '@Shared/hooks/useDebounce';
import { searchUsers } from '@Store/slices/users';

import { ChatsPanel } from '@Components';

const ChatsPanelContainer = () => {
	const dispatch = useAppDispatch();
	const chats = useAppSelector((state) => state.chats);
	const users = useAppSelector((state) => state.users);

	const chatList = chats.chats;
	const usersList = users.users;

	const isChatsLoading = chats.loading;
	const isUsersLoading = users.loading;

	const isLoading = isChatsLoading || isUsersLoading;

	const [searchValue, setSearchValue] = useState('');
	const debouncedSearch = useDebounce(searchValue);

	useEffect(() => {
		dispatch(
			searchUsers({
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
			users={usersList}
			isLoading={isLoading}
		/>
	);
};

export default ChatsPanelContainer;
