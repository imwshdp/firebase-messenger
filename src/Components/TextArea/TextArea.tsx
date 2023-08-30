import { ChangeEvent, FC, useEffect, useId, useRef } from 'react';

import clsx from 'clsx';

import styles from './TextArea.module.scss';

type TextAreaType = 'default' | 'transparent';

interface PropsType {
	value: string;
	setValue: (value: string) => void;

	type?: TextAreaType;
	disabled?: boolean;
	placeholder?: string;

	name?: string;
	cols?: number;
	rows?: number;

	resizable?: boolean;
	maxHeight?: number;
}

const TextArea: FC<PropsType> = ({
	value,
	setValue,
	name,
	disabled,
	placeholder = 'Enter text...',
	cols,
	rows,
	type,
	resizable,
	maxHeight,
}) => {
	const id = useId();

	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (resizable) {
			const element = textAreaRef.current;
			if (element) {
				element.style.height = 'auto';

				if (maxHeight) {
					element.style.height =
						element.scrollHeight < maxHeight ? element.scrollHeight + 'px' : `${maxHeight}` + 'px';
				} else {
					element.style.height = element.scrollHeight + 'px';
				}
			}
		}
	}, [value, maxHeight, resizable]);

	const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setValue(event.target.value);
	};

	return (
		<textarea
			value={value}
			onChange={handleOnChange}
			name={name || id}
			id={id}
			cols={cols}
			rows={rows}
			disabled={disabled}
			placeholder={placeholder}
			className={clsx(styles['textarea'], styles[`textarea_${type}`])}
			ref={textAreaRef}
		/>
	);
};

export default TextArea;
