import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import store from 'app/redux/store'
import { Provider } from 'react-redux'
import App from "app/App";
import "./index.scss"; // Standard version
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { MetronicLayoutProvider } from 'app/components/layout/MetronicLayout';
import { MetronicSplashScreenProvider } from 'app/components/layout/MetronicSplashScreen';
import { MetronicSubheaderProvider } from "app/components/layout/MetronicSubheader";
import { MetronicI18nProvider } from "app/helpers/i18n";
import { CookiesProvider } from 'react-cookie';

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;

/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/* const mock =  _redux.mockAxios(axios); */
/**
 * Inject metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
/* _redux.setupAxios(axios, store); */

ReactDOM.render(
  <CookiesProvider>
    <Provider store={ store }>
      <Router>
        <MetronicI18nProvider>
          <MetronicLayoutProvider>
            <MetronicSubheaderProvider>
              <MetronicSplashScreenProvider>
                <App basename={ PUBLIC_URL } />
              </MetronicSplashScreenProvider>
            </MetronicSubheaderProvider>
          </MetronicLayoutProvider>
        </MetronicI18nProvider>
      </Router>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
