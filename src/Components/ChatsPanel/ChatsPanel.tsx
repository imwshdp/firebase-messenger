import { FC } from 'react';

import { ChatListWithSearchContainer, UserListWithSearchContainer } from '@Containers';

import { Modal } from '@Components';

import styles from './ChatsPanel.module.scss';

interface PropsType {
	isMenuOpen: boolean;
	closeModal: () => void;
}

const ChatsPanel: FC<PropsType> = ({ isMenuOpen, closeModal }) => {
	return (
		<>
			<aside className={styles['aside']}>
				<div className={styles['aside__chats']}>
					<ChatListWithSearchContainer />
				</div>

				<div className={styles['aside__separator']} />

				<div className={styles['aside__users']}>
					<UserListWithSearchContainer />
				</div>
			</aside>

			{isMenuOpen && (
				<Modal closeModal={closeModal}>
					<div className={styles['modal']}>
						<div className={styles['aside__chats']}>
							<ChatListWithSearchContainer />
						</div>

						<div className={styles['aside__separator']} />

						<div className={styles['aside__users']}>
							<UserListWithSearchContainer />
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

export default ChatsPanel;
