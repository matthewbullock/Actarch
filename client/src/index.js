import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeMainRoutes } from './routes';
import {IntlProvider} from 'react-intl';
const routes = makeMainRoutes();

ReactDOM.render(
  <IntlProvider locale="en" timeZone="Europe/London">
    {routes}
  </IntlProvider>,
  document.getElementById('root')
);
registerServiceWorker();
