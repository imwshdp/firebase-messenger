import { FC } from 'react';

import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { closeMenu } from '@Store/slices/menu';

import { ChatsPanel } from '@Components';

const ChatsPanelContainer: FC = () => {
	const dispatch = useAppDispatch();

	const isMenuOpen = useAppSelector((state) => state.menu.isModalOpen);
	const closeModal = () => dispatch(closeMenu());

	return <ChatsPanel isMenuOpen={isMenuOpen} closeModal={closeModal} />;
};

export default ChatsPanelContainer;
