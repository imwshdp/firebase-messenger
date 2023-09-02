import { FC } from 'react';

import { Search } from '@Components';

import styles from './ChatsPanel.module.scss';

interface PropsType {
	searchValue: string;
	setSearchValue: (value: string) => void;
}

const ChatsPanel: FC<PropsType> = ({ searchValue, setSearchValue }) => {
	const handleSearch = (newValue: string) => {
		setSearchValue(newValue);
	};

	return (
		<aside className={styles['chats']}>
			<Search value={searchValue} setValue={handleSearch} />
			<div>чятик</div>
			<div>чятик</div>
			<div>чятик</div>
			<div>чятик</div>
			<div>чятик</div>
		</aside>
	);
};

export default ChatsPanel;
