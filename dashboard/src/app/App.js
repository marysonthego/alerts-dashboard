import React, { useEffect } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { AuthInit } from 'app/components/AuthInit';
import { Routes } from 'app/Routes';
import { I18nProvider } from 'app/helpers/i18n';
import { MaterialThemeProvider } from 'app/components/layout/MaterialThemeProvider';
import { SnackbarProvider } from 'notistack';
import { Collapse } from '@material-ui/core';

const DebugRouter = ({ children }) => {
  let { location } = useHistory();
  if (process.env.NODE_ENV === 'development')
  {
    console.log(
      `DEBUG ROUTER: location.pathname:`,
      location.pathname,
      `location.search:`,
      location.search,
      `location.state:`,
      JSON.stringify(location.state),
      `children:`,
      children
    );
  }
  return children;
};

function App ({ basename }) {
  let location = useLocation();

  useEffect(() => {
    //console.log(`location.pathname:`,location.pathname);
  }, [location]);

  return (
    <MaterialThemeProvider>
      <I18nProvider>
        <SnackbarProvider dense maxSnack={ 3 } TransitionComponent={Collapse} preventDuplicate>
          <AuthInit>
            <Route
              render={ () => {
                return (
                  <DebugRouter>
                    <Routes />
                  </DebugRouter>
                );
              } }
            />
          </AuthInit>
        </SnackbarProvider>
      </I18nProvider>
    </MaterialThemeProvider>
  );
}
export default App;
