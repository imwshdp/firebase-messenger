import { ChangeEvent, FC, useState } from 'react';

interface PropsType {
	buttonTitle: string;
	handleSubmit: (email: string, password: string) => void;
}
const Form: FC<PropsType> = ({ buttonTitle, handleSubmit }) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleClick = (event: any) => {
		event.preventDefault();
		handleSubmit(email, password);
	};

	return (
		<form>
			<input type='email' value={email} onChange={handleEmailChange} placeholder='Введите почту' />
			<input
				type='password'
				value={password}
				onChange={handlePasswordChange}
				placeholder='Введите пароль'
			/>
			<button onClick={handleClick}>{buttonTitle}</button>
		</form>
	);
};

export default Form;
