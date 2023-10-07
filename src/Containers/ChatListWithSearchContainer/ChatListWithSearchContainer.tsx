import { FC, useEffect, useRef, useState } from 'react';

import { LIST_LINK_TYPES } from '@Shared/content/constants';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import useDebounce from '@Shared/hooks/useDebounce';
import { filterChats, setLoadingManually } from '@Store/slices/chats';

import { LinkList, Search } from '@Components';

const ChatListWithSearchContainer: FC = () => {
	const dispatch = useAppDispatch();

	const chatList = useAppSelector((state) => state.chats.filteredChats);
	const isLoading = useAppSelector((state) => state.chats.loading);

	const [searchValue, setSearchValue] = useState('');
	const debouncedSearch = useDebounce(searchValue);

	useEffect(() => {
		dispatch(setLoadingManually(true));
		setTimeout(() => {
			dispatch(filterChats(debouncedSearch));
			dispatch(setLoadingManually(false));
		}, 100);
	}, [debouncedSearch]);

	const handleSearch = (value: string) => {
		setSearchValue(value);
	};

	const inputRef = useRef<HTMLInputElement | null>(null);

	return (
		<>
			<Search
				value={searchValue}
				setValue={handleSearch}
				ref={inputRef}
				placeholder='Найти чат...'
			/>
			<LinkList type={LIST_LINK_TYPES.Chats} items={chatList} isLoading={isLoading} />
		</>
	);
};

export default ChatListWithSearchContainer;
