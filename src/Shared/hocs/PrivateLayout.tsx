import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { RoutesLinks } from '@Router';
import { useAuth } from '@Shared/hooks/useAuth';

interface PropsType {
	children: JSX.Element;
}
const PrivateLayout: FC<PropsType> = ({ children }) => {
	const location = useLocation();
	const { isAuth } = useAuth();

	if (!isAuth) {
		return <Navigate to={RoutesLinks.login} state={{ from: location }} />;
	}

	return children;
};

export default PrivateLayout;
