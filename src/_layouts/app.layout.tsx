import { Box } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Copyright from '../_components/Copyright/copyright.component';
import Navi from '../_components/Navi/navi.component';
import { HomePage } from '../_views/Home';
import { LoginPage } from '../_views/Login';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <LoginPage />,
  },
  {
    path: '/home',
    main: () => <HomePage />,
  },
];

function App() {
  return (
    <Router>
      <div>
        <Navi />
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.main />}
            />
          ))}
        </Switch>
        <Box mt={8}>
          <Copyright />
        </Box>
      </div>
    </Router>
  );
}

export default App;
