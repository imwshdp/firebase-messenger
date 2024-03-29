import { FC, useEffect, useRef, useState } from 'react';

import { LIST_LINK_TYPES } from '@Shared/content/constants';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import useDebounce from '@Shared/hooks/useDebounce';
import { searchUsers } from '@Store/slices/users';

import { LinkList, Search } from '@Components';

const UserListWithSearchContainer: FC = () => {
	const dispatch = useAppDispatch();

	const userList = useAppSelector((state) => state.users.users);
	const isLoading = useAppSelector((state) => state.users.loading);

	const [searchValue, setSearchValue] = useState('');
	const debouncedSearch = useDebounce(searchValue);

	useEffect(() => {
		dispatch(
			searchUsers({
				userName: debouncedSearch,
			}),
		);
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
				placeholder='Найти пользователей...'
			/>
			<LinkList type={LIST_LINK_TYPES.Users} items={userList} isLoading={isLoading} />
		</>
	);
};

export default UserListWithSearchContainer;
