/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, {useEffect} from "react";
import {
  Redirect, 
  Route, 
  Switch,
} from "react-router-dom";
import {Layout} from "app/components/layout/Layout";
import BasePage from "app/BasePage";
import {Logout} from 'app/pages/Logout';
import {AuthPage} from "app/pages/AuthPage";
import {ErrorPage} from "app/pages/ErrorPage1";
import { useSessionStorage } from 'app/helpers/SessionStorageHelpers';


export function Routes() {

  const [isLoggedIn, setIsLoggedIn] = useSessionStorage("isLoggedIn", 0); // 0 with CORS

  //can't use cookies with http CORS
  useEffect(() => {
    if(document.cookie.startsWith('connect.sid')) {
        setIsLoggedIn(1); 
      } else {
        setIsLoggedIn(0);
      }
  },[setIsLoggedIn]);

  console.log(`Routes isLoggedIn:`, isLoggedIn);
  return (
    <Switch >
      {isLoggedIn === 0 ? (
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

      {isLoggedIn === 0 ? (
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

