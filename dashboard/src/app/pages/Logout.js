import React from 'react';
import { 
  Redirect,
  Switch,
} from 'react-router-dom';
import { ContentRoute } from 'app/components/layout/ContentRoute';
import { logout } from 'app/components/AuthCrud';
import { Login } from 'app/pages/Login';

export function Logout() {

  async function doLogout() {
    await logout();
    sessionStorage.clear();
  }

  doLogout();

  return (
    <Switch>
      <ContentRoute exact path="/" component={Login} />
      <Redirect to="/"/>
    </Switch>
  );
}
