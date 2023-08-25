import { Navigate, Route, Routes } from 'react-router-dom';
import { RoutesData } from './RoutesData';
import { HomePage, LoginPage, RegistrationPage } from '@Pages';

export const Router = (
	<Routes>
		<Route path={RoutesData.root} element={<Navigate to={RoutesData.home} />} />
		<Route path={RoutesData.home} element={<HomePage />} />
		<Route path={RoutesData.login} element={<LoginPage />} />
		<Route path={RoutesData.registration} element={<RegistrationPage />} />
	</Routes>
);
