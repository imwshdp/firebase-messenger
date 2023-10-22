import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValidationState } from '@Shared/model';

const initialState: ValidationState = {
	isValidated: false,
	email: '',
	password: '',
	name: '',
};

const requiredMessage = 'Поле обязательно для заполнения';
const passwordLengthMessage = 'Слишком короткий пароль';
const emailNotValidPattern = 'Введите реальный адрес электронной почты';
const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export const validationSlice = createSlice({
	name: 'validation',
	initialState,
	reducers: {
		validateEmail(state, { payload }: PayloadAction<string>) {
			return {
				...state,
				email:
					payload.length > 0
						? payload.match(emailPattern)
							? ''
							: emailNotValidPattern
						: requiredMessage,
			};
		},
		validatePassword(state, { payload }: PayloadAction<string>) {
			const message =
				payload.length > 0 ? (payload.length > 5 ? '' : passwordLengthMessage) : requiredMessage;

			return { ...state, password: message };
		},
		validateName(state, { payload }: PayloadAction<string>) {
			return { ...state, name: payload.length > 0 ? '' : requiredMessage };
		},
		resetValidation() {
			return initialState;
		},
		validateForm(state) {
			return { ...state, isValidated: true };
		},
	},
});

export const { validateEmail, validatePassword, validateName, resetValidation, validateForm } =
	validationSlice.actions;
export default validationSlice.reducer;
