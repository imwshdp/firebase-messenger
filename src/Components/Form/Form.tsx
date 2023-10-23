import { FC, ReactNode } from 'react';

import { FORM_TYPES } from '@Shared/content/constants';
import { ValidationState } from '@Shared/model';

import { Button, FileUploader, Input } from '@Components';

import styles from './Form.module.scss';

interface PropsType {
	buttonTitle: string;
	type: FORM_TYPES;
	children?: ReactNode;

	state: {
		email: {
			value: string;
			setValue: (value: string) => void;
		};
		password: {
			value: string;
			setValue: (value: string) => void;
		};
		displayName?: {
			value: string;
			setValue: (value: string) => void;
		};
		profilePicture?: {
			value: File | null;
			setValue: (value: File) => void;
		};
	};
	validation: ValidationState;

	onSubmit: () => void;
	onAlternativeSubmit?: () => void;
}
const Form: FC<PropsType> = ({
	buttonTitle,
	type,
	children,

	state,
	validation,

	onSubmit,
	onAlternativeSubmit,
}) => {
	const { email, password, displayName, profilePicture } = state;

	const isSubmitDisabled = validation.isValidated
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
				value={email.value}
				setValue={email.setValue}
				placeholder='Введите почту'
				errorMessage={validation.isValidated ? validation.email : undefined}
			/>
			<Input
				type='password'
				name='password'
				value={password.value}
				setValue={password.setValue}
				placeholder='Введите пароль'
				errorMessage={validation.isValidated ? validation.password : undefined}
			/>

			{type === FORM_TYPES.register && displayName && profilePicture && (
				<>
					<Input
						type='displayName'
						name='displayName'
						value={displayName.value}
						setValue={displayName.setValue}
						placeholder='Введите отображаемое имя'
						errorMessage={validation.isValidated ? validation.name : undefined}
					/>
					<FileUploader
						placeholder='Загрузить аватар'
						onChange={profilePicture.setValue}
						isUploaded={!!profilePicture.value}
					/>
				</>
			)}

			<Button onClick={onSubmit} title={buttonTitle} disabled={isSubmitDisabled} />

			{type === FORM_TYPES.login && (
				<>
					<b className={styles['form__text']}>или</b>
					<Button onClick={onAlternativeSubmit} title='Войти с помощью Google' />
				</>
			)}

			{children}
		</form>
	);
};

export default Form;
