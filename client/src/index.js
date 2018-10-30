import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { makeMainRoutes } from './routes';
import { IntlProvider } from 'react-intl';
import store from './store'
const routes = makeMainRoutes();

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale="en" timeZone="Europe/London">
      {routes}
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
