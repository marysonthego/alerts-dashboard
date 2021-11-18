import React from 'react';
import { 
  Redirect,
  Switch,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, resetUserState } from 'app/redux/userSlice';
import { resetLocations } from 'app/redux/locationsSlice';
import { resetFriends } from 'app/redux/friendsSlice';
import { ContentRoute } from 'app/components/layout/ContentRoute';
import { logout } from 'app/components/AuthCrud';
import { Login } from 'app/pages/Login';
import { initUser, initLocations, initFriends } from 'app/helpers/Initializers';

export function Logout() {
  const dispatch = useDispatch();

  async function doLogout() {
    await logout();
    
  }
  dispatch(resetUserState(null));
  dispatch(resetLocations(null));
  dispatch(resetFriends(null));

  doLogout();

  return (
    <Switch>
      <ContentRoute exact path="/auth/login" component={Login} />
      <Redirect to="/auth/login"/>
    </Switch>
  );
}
