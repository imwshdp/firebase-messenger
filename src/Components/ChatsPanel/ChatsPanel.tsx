import { FC } from 'react';

import { ChatLinkContainer } from '@Containers';
import { User } from '@Shared/model';

import { Search } from '@Components';

import styles from './ChatsPanel.module.scss';

interface PropsType {
	searchValue: string;
	setSearchValue: (value: string) => void;

	chats: User[];
	isLoading: boolean;
}

const ChatsPanel: FC<PropsType> = ({ searchValue, setSearchValue, chats, isLoading }) => {
	const handleSearch = (newValue: string) => {
		setSearchValue(newValue);
	};

	return (
		<aside className={styles['chats']}>
			<Search value={searchValue} setValue={handleSearch} disabled={isLoading} />
			<section className={styles['chats__list']}>
				{chats.map(({ uid, displayName, photoURL }) => (
					<ChatLinkContainer
						key={uid}
						// TODO add anon as default to store
						uid={uid}
						displayName={displayName}
						photoURL={photoURL || null}
					/>
				))}

				{isLoading && <div className={styles['chats__list__overlay']} />}
			</section>
		</aside>
	);
};

export default ChatsPanel;
