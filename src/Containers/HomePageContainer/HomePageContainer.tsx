import { FC, useEffect } from 'react';

import { ModalOfFilesViewContainer } from '@Containers';
import { HomePage } from '@Pages';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { useOnSnapshotChats } from '@Shared/hooks/useOnSnapshotChats';
import { resetChat } from '@Store/slices/messages';
import { fetchUsers } from '@Store/slices/users';

const HomePageContainer: FC = () => {
	const dispatch = useAppDispatch();
	const currentUserId = useAppSelector((state) => state.user.uid);

	const isFilesModalOpen = useAppSelector((state) => state.modal.isModalOpen);

	useOnSnapshotChats({ currentUserId });

	useEffect(() => {
		dispatch(fetchUsers());

		return () => {
			dispatch(resetChat());
		};
	}, []);

	return (
		<>
			<HomePage />
			{isFilesModalOpen && <ModalOfFilesViewContainer />}
		</>
	);
};

export default HomePageContainer;
