import { FC, useEffect, useRef, useState } from 'react';

import { LinkListType } from '@Shared/content/constants';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import useDebounce from '@Shared/hooks/useDebounce';
import { searchUsers } from '@Store/slices/users';

import { LinkList, Search } from '@Components';

const UserListWithSearchContainer: FC = () => {
	const dispatch = useAppDispatch();

	const users = useAppSelector((state) => state.users);
	const userList = users.users;
	const isLoading = users.loading;

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
			<LinkList type={LinkListType.Users} items={userList} isLoading={isLoading} />
		</>
	);
};

export default UserListWithSearchContainer;
