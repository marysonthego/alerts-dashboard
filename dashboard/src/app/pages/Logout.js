import React from 'react';
import { 
  Redirect,
  Switch 
} from 'react-router-dom';
import { ContentRoute } from 'app/components/layout/ContentRoute';
import { logout } from 'app/components/AuthCrud';
import { Login } from 'app/pages/Login';

export function Logout() {
  
  async function doLogout() {
    await logout();
    sessionStorage.clear();
    //window.location.assign('http://localhost:3002/auth/login');
    window.location.assign('https://alerts-dashboard.herokuapp.com/auth/login');
  }
  doLogout();

  return (
    <Switch>
      <ContentRoute exact path="/auth/login" component={Login} />
      <Redirect to="/auth/login"/>
    </Switch>
  );
}
