import { FC, useEffect, useRef } from 'react';

import { ChatLinkContainer } from '@Containers';
import { UserChatInfo, UserInfo } from '@Shared/model';

import { Search } from '@Components';

import styles from './ChatsPanel.module.scss';

interface PropsType {
	searchValue: string;
	setSearchValue: (value: string) => void;

	chats: UserChatInfo[];
	users: UserInfo[];

	isLoading: boolean;
}

const ChatsPanel: FC<PropsType> = ({ searchValue, setSearchValue, chats, users, isLoading }) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleSearch = (newValue: string) => {
		setSearchValue(newValue);
	};

	useEffect(() => {
		if (!isLoading) {
			inputRef.current?.focus();
		}
	}, [isLoading]);

	return (
		<aside className={styles['chats']}>
			<Search value={searchValue} setValue={handleSearch} disabled={isLoading} ref={inputRef} />
			<section className={styles['chats__list']}>
				{chats.map(({ userInfo }) => (
					<ChatLinkContainer
						key={userInfo.uid}
						// TODO add anon as default to store
						uid={userInfo.uid}
						displayName={userInfo.displayName}
						photoURL={userInfo.photoURL || null}
					/>
				))}

				<div className={styles['chats__list__separator']} />

				{users.map(({ uid, displayName, photoURL }) => (
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
