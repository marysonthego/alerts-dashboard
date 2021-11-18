import React, {useEffect} from "react";
import {
  Redirect, 
  Route, 
  Switch,
} from "react-router-dom";
import { 
  useDispatch, 
  useSelector 
} from 'react-redux';
import { 
  selectCurrentUser, 
  updateIsLoggedInState 
} from 'app/redux/userSlice';
import {Layout} from "app/components/layout/Layout";
import BasePage from "app/BasePage";
import {Logout} from 'app/pages/Logout';
import {AuthPage} from "app/pages/AuthPage";
import {ErrorPage} from "app/pages/ErrorPage1";

export function Routes() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  
  //can't use cookies with http CORS
  useEffect(() => {
    if(document.cookie.startsWith('connect.sid')) {
        dispatch(updateIsLoggedInState(1));
      } else {
        dispatch(updateIsLoggedInState(0));
      }
      console.log(`Routes isLoggedIn:`, currentUser.isLoggedIn);
  });

  return (
    <Switch >
      {currentUser.isLoggedIn === 0 ? (
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

      {currentUser.isLoggedIn === 0 ? (
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

