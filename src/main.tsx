import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from '@App';
import { AppContainer } from '@Containers';
import { store } from '@Store';

// TODO think
import '@Config';

import '@Assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
	<BrowserRouter>
		<Provider store={store}>
			<AppContainer>
				<App />
			</AppContainer>
		</Provider>
	</BrowserRouter>,
	// </React.StrictMode>,
);
