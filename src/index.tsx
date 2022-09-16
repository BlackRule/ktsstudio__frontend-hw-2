import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import '@config/configureMobX';
import App from '@components/App/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    {/*Внимание StrictMode вызывает ДВОЙНОЙ mount всего чо внутри*/}
    {/*А еще почему-то с ним реакция _recalculateTotalPagesReaction не срабатывает*/}
    {/*<React.StrictMode>*/}
    <App />
    {/*</React.StrictMode>*/}
  </BrowserRouter>
);
