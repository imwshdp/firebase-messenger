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
		// TODO add filter
		// dispatch(
		// 	searchUsers({
		// 		userName: debouncedSearch,
		// 	}),
		// );
	}, [debouncedSearch]);

	const handleSearch = (value: string) => {
		setSearchValue(value);
	};

	// TODO memo
	// const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
	// const handleFocus = () => setIsInputFocused(true);
	// const handleBlur = () => {
	// 	console.log('blured');
	// 	setIsInputFocused(false);
	// };

	// useEffect(() => {
	// 	console.log('rerender');

	// 	inputRef.current?.addEventListener('focus', handleFocus);
	// 	inputRef.current?.addEventListener('blur', handleBlur);

	// 	return () => {
	// 		inputRef.current?.removeEventListener('focus', handleFocus);
	// 		inputRef.current?.removeEventListener('blur', handleBlur);
	// 	};
	// }, []);

	// useEffect(() => {
	// 	// console.log('isInputFocused', isInputFocused);
	// 	if (
	// 		!isLoading
	// 		// && isInputFocused
	// 	) {
	// 		inputRef.current?.focus();
	// 	}
	// }, [isLoading]);

	const inputRef = useRef<HTMLInputElement | null>(null);

	return (
		<>
			<Search
				value={searchValue}
				setValue={handleSearch}
				disabled={isLoading}
				ref={inputRef}
				placeholder='Найти чат...'
			/>
			<LinkList type={LinkListType.Chats} items={chatList} isLoading={isLoading} />
		</>
	);
};

export default ChatListWithSearchContainer;
