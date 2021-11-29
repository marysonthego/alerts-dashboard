import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LayoutSplashScreen } from 'app/components/layout/MetronicSplashScreen';
import { ContentRoute } from 'app/components/layout/ContentRoute';
import { DashboardPage } from 'app/pages/DashboardPage';
import { ChangePassword } from 'app/pages/ChangePassword';
import { Login } from 'app/pages/Login';
import { Logout } from 'app/pages/Logout';
import { UserProfilePage } from 'app/pages/UserProfilePage';
import { LocationsStep } from 'app/pages/LocationsStep';
import { FriendsStep } from 'app/pages/FriendsStep';
import { ListCustomers } from 'app/pages/ListCustomers';
//import { RssPage } from 'app/pages/RssPage';
import { selectCurrentUser } from 'app/redux/userSlice';

export default function BasePage (props) {
  let currentUser = useSelector(selectCurrentUser);
  console.log(`BasePage isLoggedIn: `, currentUser.isLoggedIn);

  return (
    <Suspense fallback={ <LayoutSplashScreen /> }>
      { currentUser.isLoggedIn ? (
        <Switch>
          <ContentRoute exact path="/dashboard" component={DashboardPage} />
          <ContentRoute exact path="/user-profile" component={UserProfilePage}/>
          <ContentRoute exact path="/logout" component={Logout}/>
          <ContentRoute exact path="/password" component={ChangePassword}/>
          <ContentRoute exact path="/locations-list" component={LocationsStep}/>
          <ContentRoute exact path="/friends-list" component={FriendsStep}/>
          <ContentRoute exact path="/list-customers" component={ListCustomers}/>
          {currentUser.usertype === 'admin' ? (
            <>
            <ContentRoute exact path="/list-customers" component={ListCustomers}/>
            {/* <ContentRoute exact path="/rss-page" component={RssPage}/> */}
            </>
          ) : (<Redirect to="/dashboard"/>)}
          <Redirect from="/" to="/dashboard" />
        </Switch>
      ) : (
        <Switch>
          <ContentRoute path="/auth/login" component={ Login } />
          <Redirect to="/auth/login" />
          <Redirect to="/error" />
        </Switch>
      )}
    </Suspense>
  );
}
