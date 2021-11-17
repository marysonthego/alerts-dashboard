import React from 'react';
import { 
  Redirect,
  Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetUser } from 'app/redux/userSlice';
import { resetLocations } from 'app/redux/locationsSlice';
import { resetFriends } from 'app/redux/friendsSlice';
import { ContentRoute } from 'app/components/layout/ContentRoute';
import { logout } from 'app/components/AuthCrud';
import { Login } from 'app/pages/Login';

export function Logout() {
  const dispatch = useDispatch();
  async function doLogout() {
    await logout();
    sessionStorage.clear();
    dispatch(resetUser());
    dispatch(resetLocations());
    dispatch(resetFriends());
  }

  doLogout();

  return (
    <Switch>
      <ContentRoute exact path="/login" component={Login} />
      <Redirect to="/login"/>
    </Switch>
  );
}
