import { FC, useEffect } from 'react';

import { HomePage } from '@Pages';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import { fetchChats } from '@Store/slices/chats';

const HomePageContainer: FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchChats());
	}, []);

	return <HomePage />;
};

export default HomePageContainer;
