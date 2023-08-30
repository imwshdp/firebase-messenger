import { ChangeEvent, FC, ReactNode, useState } from 'react';

import { Button, FileUploader } from '@Components';

import styles from './Form.module.scss';

type FormType = 'login' | 'register';
interface PropsType {
	buttonTitle: string;
	handleSubmit: (email: string, password: string) => void;
	handleAlternativeSubmit?: () => void;
	type: FormType;
	children?: ReactNode;
}
const Form: FC<PropsType> = ({
	buttonTitle,
	handleSubmit,
	handleAlternativeSubmit,
	type,
	children,
}) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleLoginClick = () => {
		handleSubmit(email, password);
	};

	const handleGoogleLoginClick = () => {
		if (handleAlternativeSubmit) handleAlternativeSubmit();
	};

	return (
		<form className={styles['form']}>
			<input type='email' value={email} onChange={handleEmailChange} placeholder='Введите почту' />
			<input
				type='password'
				value={password}
				onChange={handlePasswordChange}
				placeholder='Введите пароль'
			/>

			{type === 'register' && <FileUploader onChange={() => {}} />}

			<Button onClick={handleLoginClick} title={buttonTitle} />

			{type === 'login' && (
				<>
					<b>или</b>
					<Button onClick={handleGoogleLoginClick} title='Войти с помощью Google' />
				</>
			)}

			{children}
		</form>
	);
};

export default Form;
