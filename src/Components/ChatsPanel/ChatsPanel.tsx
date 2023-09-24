import { FC } from 'react';

import { IconOfUser } from '@Shared/content/Icons';
import { User } from '@Shared/model';

import { Search } from '@Components';

import styles from './ChatsPanel.module.scss';

interface PropsType {
	searchValue: string;
	setSearchValue: (value: string) => void;

	chats: User[];
}

const ChatsPanel: FC<PropsType> = ({ searchValue, setSearchValue, chats }) => {
	const handleSearch = (newValue: string) => {
		setSearchValue(newValue);
	};

	return (
		<aside className={styles['chats']}>
			<Search value={searchValue} setValue={handleSearch} />
			<section className={styles['chats__list']}>
				{chats.map(({ uid, displayName, photoUrl }) => (
					<div key={uid} className={styles['chats__list__chat']}>
						{photoUrl ? (
							<img
								className={styles['chats__list__chat__profile-picture']}
								src={photoUrl}
								alt='User Profile Photo'
								// TODO add anon as default to store
								title={displayName || 'Anonymous'}
							/>
						) : (
							<IconOfUser className={styles['chats__list__chat__profile-picture']} />
						)}
						{displayName}
					</div>
				))}
			</section>
		</aside>
	);
};

export default ChatsPanel;
