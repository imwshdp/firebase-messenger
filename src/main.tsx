import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AppContainer } from '@Containers';
import { store } from '@Store';

import '@Assets/styles/index.scss';

import '@Config'; // TODO research firebase config

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
);
