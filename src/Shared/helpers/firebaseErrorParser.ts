import { FIREBASE_ERRORS } from '@Shared/content/constants';
import { ErrorState } from '@Shared/model';

export function firebaseErrorParser(code: string, error: string): ErrorState {
	switch (code) {
		case FIREBASE_ERRORS.userNotFound:
			return {
				code: 400,
				message: 'Пользователь с данным адресом электронной почты не найден',
			};

		case FIREBASE_ERRORS.emailAlreadyUsed:
			return {
				code: 400,
				message: 'Данный адрес электронной почты уже привязан к учетной записи',
			};

		case FIREBASE_ERRORS.emailAlreadyExists:
			return {
				code: 400,
				message: 'Данный адрес электронной почты уже привязан к учетной записи',
			};

		case FIREBASE_ERRORS.invalidEmail:
			return {
				code: 400,
				message: 'Пользователь с данным адресом электронной почты не найден',
			};

		case FIREBASE_ERRORS.wrongPassword:
			return {
				code: 400,
				message: 'Некорректные данные для входа под данным адресом электронной почты',
			};

		case FIREBASE_ERRORS.weakPassword:
			return {
				code: 400,
				message: 'Слишком короткий пароль. Пароль должен состоять не менее чем из шести символов',
			};

		case FIREBASE_ERRORS.network:
			return {
				code: 400,
				message: 'Отсутствует подключение к сети',
			};

		case FIREBASE_ERRORS.tokenExpired:
			return {
				code: 403,
				message: 'Ошибка аутентификации',
			};

		case FIREBASE_ERRORS.invalidPassword:
			return {
				code: 406,
				message: 'Неверные данные для входа',
			};

		case FIREBASE_ERRORS.blobSlice:
			return {
				code: 409,
				message: 'Ошибка при попытке изменении медиаконтента',
			};

		case FIREBASE_ERRORS.fileSize:
			return {
				code: 409,
				message: 'Ошибка при загрузке контента',
			};

		case FIREBASE_ERRORS.stackOverflow:
			return {
				code: 429,
				message: 'Превышен лимит на количество одновременных запросов. Попробуйте позже.',
			};

		case FIREBASE_ERRORS.internal:
			return {
				code: 500,
				message: 'Внутренняя ошибка сервера',
			};

		case FIREBASE_ERRORS.unknown:
			return {
				code: 503,
				message: 'Неизвестная ошибка сервера',
			};

		case FIREBASE_ERRORS.quotaExceeded:
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
