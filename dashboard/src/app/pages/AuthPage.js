/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { ContentRoute } from 'app/components/layout/ContentRoute';
import { Login } from 'app/pages/Login';
import { Logout } from 'app/pages/Logout';
import { ForgotPasswordPage } from 'app/pages/ForgotPasswordPage';
import { DashboardPage } from 'app/pages/DashboardPage';
import { ProfileStepper } from 'app/pages/ProfileStepper';
import { EditProfilePage } from 'app/pages/EditProfilePage';
import 'app/css/pages/login/login-1.scss';
import { useSessionStorage } from 'app/helpers/SessionStorageHelpers';

function Routing() {
  const [isLoggedIn, setIsLoggedIn] = useSessionStorage("isLoggedIn", 0);

  useEffect(() => {
    if(document.cookie.startsWith('connect.sid')) {
        //console.log(`AuthPage useEffect 1`);
        setIsLoggedIn(1); 
      } else {
        //console.log(`AuthPage useEffect 0`);
        setIsLoggedIn(0);
      }
  });

  //console.log(`AuthPage isLoggedIn:`, isLoggedIn);
  return (
    <div>
      { isLoggedIn === 1
      ? (
        <Switch>
          <ContentRoute path="/dashboard" component={DashboardPage} />
          <ContentRoute exact path="/user-profile" component={EditProfilePage} />
          <ContentRoute exact path="/logout" component={Logout} />
          {/* <Redirect to="/dashboard" /> */}
        </Switch>
      ) : (
        <Switch>
          <ContentRoute exact path="/auth/login" component={Login} />
          <ContentRoute
            exact
            path="/auth/forgot-password"
            component={ForgotPasswordPage}
          />
          <ContentRoute
            exact
            path="/auth/profilestepper"
            component={ProfileStepper}
          />
          <Redirect from="/auth" exact={true} to="/auth/login" />
          <Redirect from="/auth/login" to="/dashboard" />;
          <Redirect to="/auth/login" />
        </Switch>
      )}
    </div>
  );
};
export const AuthPage = Routing;
