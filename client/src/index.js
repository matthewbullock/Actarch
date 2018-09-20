import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router } from 'react-router-dom';
import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();



ReactDOM.render(
  routes,
  document.getElementById('root')
);
registerServiceWorker();
