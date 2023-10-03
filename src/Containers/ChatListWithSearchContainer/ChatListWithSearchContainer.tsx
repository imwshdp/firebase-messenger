import { FC, useEffect, useRef, useState } from 'react';

import { LinkListType } from '@Shared/content/constants';
// import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import useDebounce from '@Shared/hooks/useDebounce';

import { LinkList, Search } from '@Components';

const ChatListWithSearchContainer: FC = () => {
	// const dispatch = useAppDispatch();

	const chats = useAppSelector((state) => state.chats);
	const chatList = chats.chats;
	const isLoading = chats.loading;

	const [searchValue, setSearchValue] = useState('');
	const debouncedSearch = useDebounce(searchValue);

	useEffect(() => {
		// dispatch(
		// 	searchUsers({
		// 		userName: debouncedSearch,
		// 	}),
		// );
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
			<LinkList type={LinkListType.Chats} items={chatList} isLoading={isLoading} />
		</>
	);
};

export default ChatListWithSearchContainer;
