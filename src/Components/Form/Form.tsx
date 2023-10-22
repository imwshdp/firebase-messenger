import { FC, ReactNode, useState } from 'react';

import { FORM_TYPES } from '@Shared/content/constants';
import { RegistrationRequestParamsType, ValidationState } from '@Shared/model';

import { Button, FileUploader, Input } from '@Components';

import styles from './Form.module.scss';

interface PropsType {
	buttonTitle: string;
	type: FORM_TYPES;
	children?: ReactNode;

	handleLogin?: (email: string, password: string) => void;
	handleRegister?: (data: RegistrationRequestParamsType) => void;
	handleAlternativeLogin?: () => void;

	validateEmail: (value: string) => void;
	validatePassword: (value: string) => void;
	validateName?: (value: string) => void;

	validation?: ValidationState;
}
const Form: FC<PropsType> = ({
	buttonTitle,
	type,
	children,

	handleLogin = () => {},
	handleRegister = () => {},
	handleAlternativeLogin,

	validateEmail,
	validatePassword,
	validateName,

	validation,
}) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [profilePicture, setProfilePicture] = useState<File | null>(null);
	const [displayName, setDisplayName] = useState<string>('');

	const handleSetAndValidateEmail = (value: string) => {
		// validateEmail(value);
		setEmail(value);
	};

	const handleSetAndValidatePassword = (value: string) => {
		// validatePassword(value);
		setPassword(value);
	};

	const handleSetAndValidateName = (value: string) => {
		// validateName && validateName(value);
		setDisplayName(value);
	};

	const handleProfilePictureChange = (file: File) => {
		setProfilePicture(file);
	};

	const handleLoginClick = () => {
		validateEmail(email);
		validatePassword(password);

		handleLogin(email, password);
	};

	const handleRegisterClick = () => {
		validateEmail(email);
		validatePassword(password);
		validateName && validateName(displayName);

		handleRegister({ email, password, displayName, profilePicture });
	};

	const handleSubmitButtonClick =
		type === FORM_TYPES.login ? handleLoginClick : handleRegisterClick;

	const isSubmitDisabled = validation
		? type === FORM_TYPES.login
			? validation?.email.length > 0 || validation?.password.length > 0
			: validation?.email.length > 0 ||
			  validation?.password.length > 0 ||
			  validation?.name.length > 0
		: false;

	return (
		<form className={styles['form']}>
			<Input
				type='email'
				name='email'
				value={email}
				setValue={handleSetAndValidateEmail}
				placeholder='Введите почту'
				errorMessage={validation?.email}
			/>
			<Input
				type='password'
				name='password'
				value={password}
				setValue={handleSetAndValidatePassword}
				placeholder='Введите пароль'
				errorMessage={validation?.password}
			/>

			{type === FORM_TYPES.register && (
				<>
					<Input
						type='displayName'
						name='displayName'
						value={displayName}
						setValue={handleSetAndValidateName}
						placeholder='Введите отображаемое имя'
						errorMessage={validation?.name}
					/>
					<FileUploader
						placeholder='Загрузить аватар'
						onChange={handleProfilePictureChange}
						isUploaded={!!profilePicture}
					/>
				</>
			)}

			<Button onClick={handleSubmitButtonClick} title={buttonTitle} disabled={isSubmitDisabled} />

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
