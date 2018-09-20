import React from 'react';
import { Route, Router } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import App from './App';
import Callback from './callback';
import Auth from './components/auth/Auth';
import Navbar from './components/Nav';
import Search from './components/Tables/Search';
import Profile from './components/Profile';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Container>
          <Navbar auth={auth} />
          <Route exact path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/search" render={(props) => <Search auth={auth} {...props} />} />
          <Route path="/profile" render={(props) => <Profile auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }}/>
        </Container>
      </div>
    </Router>
  );
}
