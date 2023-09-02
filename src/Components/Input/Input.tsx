import { ChangeEvent, FC, useId } from 'react';

import clsx from 'clsx';

import styles from './Input.module.scss';

interface PropsType {
	value: string;
	setValue: (value: string) => void;

	disabled?: boolean;
	placeholder?: string;

	name?: string;
	type?: string;
}

const Input: FC<PropsType> = ({ value, setValue, disabled, placeholder, name, type = 'text' }) => {
	const id = useId();

	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	return (
		<input
			type={type}
			value={value}
			onChange={handleOnChange}
			name={name || id}
			id={id}
			disabled={disabled}
			placeholder={placeholder}
			className={clsx(styles['input'])}
		/>
	);
};

export default Input;
