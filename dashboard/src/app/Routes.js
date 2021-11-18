import React from "react";
import {
  Redirect, 
  Route, 
  Switch,
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'app/redux/userSlice';
import { Layout } from "app/components/layout/Layout";
import BasePage from "app/BasePage";
import { Logout } from 'app/pages/Logout';
import { AuthPage } from "app/pages/AuthPage";
import { ErrorPage } from "app/pages/ErrorPage1";

export function Routes() {
  let currentUser = useSelector(selectCurrentUser);
  console.log(`Routes currentUser:`, currentUser);

  return (
    <Switch >
      {currentUser.isLoggedIn === null || !currentUser.isLoggedIn ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route >
          <AuthPage/>
        </Route>
      ) : (
        /*Otherwise redirect to root page (`/`)*/
         <Redirect from="/auth" to="/" />
      )}

      <Route path="/error" component={ErrorPage} />
      <Route path="/logout" component={Logout} />

      {currentUser.isLoggedIn === null || !currentUser.isLoggedIn ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to="/auth" />
      ) : (
        <Layout>
          <BasePage/>
        </Layout>
      )}
    </Switch>
  );
}

