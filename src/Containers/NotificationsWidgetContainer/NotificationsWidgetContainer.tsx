import { FC } from 'react';

import { VISIBLE_NOTIFICATIONS_NUMBER } from '@Shared/content/constants';
import useAppDispatch from '@Shared/hooks/useAppDispatch';
import useAppSelector from '@Shared/hooks/useAppSelector';
import { closeError } from '@Store/slices/errors';

import { NotificationsWidget } from '@Components';

const NotificationsWidgetContainer: FC = () => {
	const dispatch = useAppDispatch();
	const errorStack = useAppSelector((state) => state.errors);
	const visibleErrors = errorStack.slice(0, VISIBLE_NOTIFICATIONS_NUMBER);

	const handleCloseNotification = (index: number) => {
		dispatch(closeError(index));
	};

	return <NotificationsWidget errors={visibleErrors} onClose={handleCloseNotification} />;
};

export default NotificationsWidgetContainer;
