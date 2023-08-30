import { ChangeEvent, FC } from 'react';

import styles from './Search.module.scss';

interface PropsType {
	value: string;
	setValue: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
}

const Search: FC<PropsType> = ({ value, setValue, placeholder = 'Введите текст...', disabled }) => {
	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	return (
		<input
			type='text'
			value={value}
			onChange={handleOnChange}
			className={styles['search']}
			placeholder={placeholder}
			disabled={disabled}
		/>
	);
};

export default Search;
