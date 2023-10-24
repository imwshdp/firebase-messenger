import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { RoutesLinks } from '@Router';
import { useAuth } from '@Shared/hooks/useAuth';

interface PropsType {
	children: JSX.Element;
}
const PublicLayout: FC<PropsType> = ({ children }) => {
	const { isAuth } = useAuth();

	if (isAuth) {
		return <Navigate to={RoutesLinks.root} replace />;
	}

	return children;
};

export default PublicLayout;
