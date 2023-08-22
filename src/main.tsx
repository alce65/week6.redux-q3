import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/app';
import './index.scss';
import { Provider } from 'react-redux';
import { appStore } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
