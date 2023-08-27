import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { HomePageContainer } from '@Containers/HomePageContainer';
import { LoginPage, NotFoundPage, RegistrationPage } from '@Pages';
import { RoutesLinks } from '@Router';
import PrivateLayout from '@Shared/hocs/PrivateLayout';
import PublicLayout from '@Shared/hocs/PublicLayout';

import { Layout } from '@Components';

const Router: FC = () => {
	return (
		<Routes>
			<Route path={RoutesLinks.root} element={<Layout />}>
				<Route
					index
					element={
						<PrivateLayout>
							<HomePageContainer />
						</PrivateLayout>
					}
				/>
				<Route
					path={RoutesLinks.login}
					element={
						<PublicLayout>
							<LoginPage />
						</PublicLayout>
					}
				/>
				<Route
					path={RoutesLinks.registration}
					element={
						<PublicLayout>
							<RegistrationPage />
						</PublicLayout>
					}
				/>

				<Route path='*' element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
};

export default Router;
