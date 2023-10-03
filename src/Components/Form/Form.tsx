import { FC, ReactNode, useState } from 'react';

import { FORM_TYPES } from '@Shared/content/constants';
import { RegistrationRequestParamsType } from '@Shared/model';

import { Button, FileUploader, Input } from '@Components';

import styles from './Form.module.scss';

interface PropsType {
	buttonTitle: string;
	handleLogin?: (email: string, password: string) => void;
	handleRegister?: (data: RegistrationRequestParamsType) => void;
	handleAlternativeLogin?: () => void;
	type: FORM_TYPES;
	children?: ReactNode;
}
const Form: FC<PropsType> = ({
	buttonTitle,
	// TODO research
	handleLogin = () => {},
	handleRegister = () => {},
	handleAlternativeLogin,
	type,
	children,
}) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [profilePicture, setProfilePicture] = useState<File | null>(null);
	const [displayName, setDisplayName] = useState<string>('');

	const handleProfilePictureChange = (file: File) => {
		setProfilePicture(file);
	};

	const handleLoginClick = () => {
		handleLogin(email, password);
	};

	const handleRegisterClick = () => {
		handleRegister({ email, password, displayName, profilePicture });
	};

	const handleSubmitButtonClick =
		type === FORM_TYPES.login ? handleLoginClick : handleRegisterClick;

	return (
		<form className={styles['form']}>
			<Input type='email' value={email} setValue={setEmail} placeholder='Введите почту' />
			<Input type='password' value={password} setValue={setPassword} placeholder='Введите пароль' />

			{type === FORM_TYPES.register && (
				<>
					<Input
						type='displayName'
						value={displayName}
						setValue={setDisplayName}
						placeholder='Введите отображаемое имя'
					/>
					<FileUploader placeholder='Загрузить аватар' onChange={handleProfilePictureChange} />
				</>
			)}

			<Button onClick={handleSubmitButtonClick} title={buttonTitle} />

			{type === FORM_TYPES.login && (
				<>
					<b className={styles['form__text']}>или</b>
					<Button onClick={handleAlternativeLogin} title='Войти с помощью Google' />
				</>
			)}

			{children}
		</form>
	);
};

export default Form;
