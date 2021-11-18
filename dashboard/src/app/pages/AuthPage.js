/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { ContentRoute } from 'app/components/layout/ContentRoute';
import { Login } from 'app/pages/Login';
import { Logout } from 'app/pages/Logout';
import { ForgotPasswordPage } from 'app/pages/ForgotPasswordPage';
import { DashboardPage } from 'app/pages/DashboardPage';
import { ProfileStepper } from 'app/pages/ProfileStepper';
import { UserProfilePage } from 'app/pages/UserProfilePage';
import 'app/css/pages/login/login-1.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, updateIsLoggedInState } from 'app/redux/userSlice';

function Routing() {
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

  //console.log(`AuthPage isLoggedIn:`, isLoggedIn);
  return (
    <div>
      { currentUser.isLoggedIn === 1
      ? (
        <Switch>
          <ContentRoute path="/dashboard" component={DashboardPage} />
          <ContentRoute exact path="/user-profile" component={UserProfilePage} />
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
