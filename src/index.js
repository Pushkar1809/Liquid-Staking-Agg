import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserContextProvider from './context/UserContext';
import WinDimContextProvider from './context/WinDimContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<UserContextProvider>
			<WinDimContextProvider>
				<App />
			</WinDimContextProvider>
		</UserContextProvider>
	</React.StrictMode>,
);