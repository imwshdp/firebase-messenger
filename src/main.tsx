import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '@App';
import { store } from '@Store';

import './firebase.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
);
