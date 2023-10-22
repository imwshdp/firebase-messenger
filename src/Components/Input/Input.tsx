import { ChangeEvent, FC, useId } from 'react';

import clsx from 'clsx';

import { TOOLTIP_ID } from '@Shared/content/constants';

import styles from './Input.module.scss';

interface PropsType {
	value: string;
	setValue: (value: string) => void;

	disabled?: boolean;
	placeholder?: string;

	name: string;
	type?: string;

	errorMessage?: string;
}

const Input: FC<PropsType> = ({
	value,
	setValue,
	disabled,
	placeholder,
	name,
	type = 'text',

	errorMessage,
}) => {
	const id = useId();

	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	return (
		<input
			data-tooltip-id={TOOLTIP_ID}
			data-tooltip-content={errorMessage}
			data-tooltip-place='top'
			type={type}
			value={value}
			onChange={handleOnChange}
			name={name || id}
			id={id}
			disabled={disabled}
			placeholder={placeholder}
			className={clsx(styles['input'], {
				[styles['input_validated']]: errorMessage,
			})}
		/>
	);
};

export default Input;
