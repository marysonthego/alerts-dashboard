import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { DoLogin } from 'app/components/AuthCrud';
import { Logout } from 'app/pages/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { 
  updateUserState,
  updateIsLoggedInState,
  selectCurrentUser, 
} from 'app/redux/userSlice';

const initialValues = {
  email: '',
  pwd: '',
};

export function Login() {
  let currentUser = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { enqueueSnackbar,  } = useSnackbar();
  const dispatch = useDispatch();

    if(document.cookie.startsWith('connect.sid')) {
      dispatch(updateIsLoggedInState(1));
    } else {
        dispatch(updateIsLoggedInState(0));
      }

  const goToDashboard = () => {
    history.push({
      pathname: '/dashboard', 
    });
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Required field'),
    pwd: Yup.string()
      .min(8, 'Minimum 8 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Required Field'),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = fieldname => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return 'is-invalid';
    }
    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return 'is-valid';
    }
    return '';
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { resetForm }) => {
      enableLoading();
      GetData(values);
      
    },
  });

  // values = email, pwd
  async function GetData(values) {
    await DoLogin(values)
      .then(data => {
        if (data.custid) {
          disableLoading();
          enqueueSnackbar('You are logged in', { 
            variant: 'success',
          });
          const newState = 1;
           dispatch(updateUserState({...data, isLoggedIn: newState}));
           console.log(`Login currentUser: `, currentUser);
           formik.resetForm();
        } 
        else {
          enqueueSnackbar('Login failed...', { 
           variant: 'error',
          });
          dispatch(updateIsLoggedInState(0));
        };
       })
      .catch(e => {
        console.log(`login error e: `, e);
        dispatch(updateIsLoggedInState(0));
      })
      .finally(() => {
        disableLoading();
        formik.setSubmitting(false);
      });
  }

  return (
    <div id="kt_body" className="quick-panel-right demo-panel-right offcanvas-right header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable brand-dark">
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div 
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
          id="kt_login">
          {/*begin::Aside*/}
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              height: '100vh',
              backgroundImage: `url('/media/a4g/a4g-splash300-20.png')`,
            
            }}>
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              <Link to="/" className="flex-column-auto mt-5 pb-lg-0 pb-10">
                <img
                  alt="Logo"
                  className="max-h-70px"
                  src="/media/a4g/a4g-logo-white.png"
                />
              </Link>
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div
                className="flex-column-fluid d-flex flex-column justify-content-center"
                style={{ color: '#65696e' }}>
                <h3 className="font-size-h1 mb-5 mt-10">
                  Welcome to Alerts for Good!
                </h3>
                <p className="font-weight-bold opacity-95">
                  Our Mission is to promote public safety, community action, and
                  well-being through subscription based alerts.
                </p>
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                <div className="opacity-95 font-weight-bold" style={{ color: '#abb2ba'}}>
                  &copy; 2021 Alerts for Good
                </div>
                <div className="d-flex">
                  <Link to="https://alertsforgood.org/about" className="ml-10">
                    About
                  </Link>
                  <Link to="https://alertsforgood/volunteer" className="ml-10">
                    Volunteer
                  </Link>
                  <Link to="https://alertsforgood/donate" className="ml-10">
                    Donate
                  </Link>
                </div>
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden ">
            <div className="d-flex flex-column-fluid flex-center mt-0">
              <div
                className="login-form login-signin"
                id="kt_login_signin_form">
                {/* begin::Head */}
                <div className="text-center mb-10 mb-lg-20">
                  <h3 className="font-size-h1">
                    Login
                  </h3>
                  <p className="text-muted font-weight-bold">
                    Login with your email address and password
                  </p>
                </div>
                {/* end::Head */}

                {/*begin::Form*/}
                <form
                  onSubmit={formik.handleSubmit}
                  className="form fv-plugins-bootstrap fv-plugins-framework">
                  <div className="form-group fv-plugins-icon-container">
                    <input
                      placeholder="Email"
                      type="email"
                      className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                        'email'
                      )}`}
                      name="email"
                      {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.email}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group fv-plugins-icon-container">
                    <input
                      placeholder="Password"
                      type="password"
                      className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                        'pwd'
                      )}`}
                      name="pwd"
                      {...formik.getFieldProps('pwd')}
                    />
                    {formik.touched.pwd && formik.errors.pwd ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.pwd}</div>
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group d-flex flex-wrap justify-content-between align-items-center">

                    {currentUser.isLoggedIn === 1 ? (
                      <div>
                        <button
                          type="button"
                          onClick={goToDashboard}
                          id="kt-profile"
                          className={`btn btn-warning font-weight-bold px-9 py-4 my-3 mr-20`}>
                          <span>Dashboard</span>
                        </button>
                        <button
                          type="button"
                          onClick={Logout}
                          id="kt_logout_signout_submit"
                          className={`btn btn-warning font-weight-bold px-9 py-4 my-3 `}>
                          <span>Logout</span>
                        </button>
                        {/* <AmplifySignOut /> */}
                      </div>
                    ) : (
                      <div>
                        <Link
                          to="/auth/forgot-password"
                          className="text-dark-50 text-hover-primary my-3 mr-20"
                          id="kt_login_forgot">
                          <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
                        </Link>
                        <button
                          id="kt_login_signin_submit"
                          type="submit"
                          onSubmit={formik.handleReset}
                          disabled={formik.isSubmitting}
                          className={`btn btn-warning font-weight-bold text-dark px-9 py-4 mr-0 my-3 `}>
                          <span>Login</span>
                          {loading && (
                            <span className="ml-3 spinner spinner-white"></span>
                          )}
                        </button>

                        <div className="position-relative top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
                          <span className="font-weight-bold text-dark-50">
                            Don't have an account yet?
                          </span>
                          <Link
                            to="/auth/profilestepper"
                            className="font-weight-bold ml-2"
                            id="kt_login_signup">
                            Sign Up!
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
                {/*end::Form*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
