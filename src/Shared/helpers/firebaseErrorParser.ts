import { firebaseErrors } from '@Shared/content/constants';
import { ErrorState } from '@Shared/model';

export function firebaseErrorParser(code: string, error: string): ErrorState {
	switch (code) {
		case firebaseErrors.userNotFound:
			return {
				code: 400,
				message: 'Пользователь с данным адресом электронной почты не найден',
			};

		// TODO what is that ?
		case firebaseErrors.emailAlreadyExists:
			return {
				code: 400,
				message: 'emailAlreadyExists',
			};

		case firebaseErrors.emailAlreadyUsed:
			return {
				code: 400,
				message: 'Данный адрес электронной почты уже привязан к учетной записи',
			};

		case firebaseErrors.tokenExpired:
			return {
				code: 403,
				message: 'Ошибка аутентификации',
			};

		case firebaseErrors.invalidPassword:
			return {
				code: 406,
				message: 'Неверные данные для входа',
			};

		case firebaseErrors.blobSlice:
			return {
				code: 409,
				message: 'Ошибка при попытке изменении медиаконтента',
			};

		case firebaseErrors.fileSize:
			return {
				code: 409,
				message: 'Ошибка при загрузке контента',
			};

		case firebaseErrors.stackOverflow:
			return {
				code: 429,
				message: 'Превышен лимит на количество запросов',
			};

		case firebaseErrors.internal:
			return {
				code: 500,
				message: 'Внутренняя ошибка сервера',
			};

		case firebaseErrors.unknown:
			return {
				code: 503,
				message: 'Неизвестная ошибка сервера',
			};

		case firebaseErrors.quotaExceeded:
			return {
				code: 507,
				message: 'Ошибка операции взаимодействия с хранилищем',
			};

		default:
			return {
				code: 404,
				message: error,
			};
	}
}
