import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toAbsoluteUrl } from 'app/helpers/AssetHelpers';
import {Form} from 'react-bootstrap';
import { 
  makeStyles, 
  TextField, 
  Box 
} from '@material-ui/core';
import SVG from 'react-inlinesvg';
import {FormValidation, fieldsValidation} from 'app/helpers/FormValidation';
import {useSessionStorage} from 'app/helpers/SessionStorageHelpers';
import {initUser, initUserErrors} from 'app/helpers/Initializers';
import { changePassword } from 'app/components/AuthCrud';
import { useSnackbar } from 'notistack';
const useStyles = makeStyles(theme => ({
  input: {
    border: 'none',
    background: '#',
  },
}));

export const ChangePassword = () => {
  const [isLoggedIn, setIsLoggedIn] = useSessionStorage("isLoggedIn", 0);
  const [loading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [user, setUser] = useSessionStorage('user', initUser);
  const [pwds, setPwds] = useState({});
  const [userErrors, setUserErrors] = useSessionStorage('usererrors', initUserErrors);
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar,  } = useSnackbar();

  useEffect(() => {
    if(document.cookie.startsWith('connect.sid')) {
        setIsLoggedIn(1); 
        setUser(user);
      } else {
        setIsLoggedIn(0);
      }
      //console.log(`ChangePassword useEffect isLoggedIn:`,isLoggedIn,`user:`,user);
  },[isLoggedIn, setIsLoggedIn, setUser, user]);

  const handleChange = e => {
    let field = e.target.name;
    let value = e.target.value;
    //console.log(`ProfileForm handleChange field:`,field,`value:`,value);
      setPwds(prev => ({
        ...prev,
        [field]: value,
      }));
  };

  const handleCancel = e => {
    history.push({
      pathname: '/dashboard', 
    });
  }

  async function handleSubmit(e) {
    let inObj = {
      custid: user.custid,
      pwd: pwds.newpwd,
    }
    await changePassword(inObj)
      .then (data => {
        if(data === 200) {
          //console.log(`data:`, data);
          enqueueSnackbar('Your password has been changed.', { 
            variant: 'success',
        });
        }
      })
  }

  const handleFieldValidation = e => {
    let field = e.target.name;
    let value = e.target.value;
    let required = e.target.required;
    let isDuplicate = false;

    const error = FormValidation(field, value, fieldsValidation, required, isDuplicate) || '';

    //console.log(`ProfileForm FormValidation returned error:`, error,`field:`, field);
    setUserErrors(prev => ({
      ...prev,
      [field]: error,
    }));   
    if (error) setIsValid(false);

    if(userErrors.pwd === '' && userErrors.newpwd === '' && userErrors.newpwd2 === '')
      setIsValid(true);
  };

  return (
    <>
      <div className="d-flex align-items-center bg-light-info rounded p-5 mb-9">
        <span className="svg-icon svg-icon-danger mr-5 svg-icon-lg">
          <SVG
            src={toAbsoluteUrl('/media/svg/icons/Communication/Thumbtack.svg')}
            title="Password Required"></SVG>
        </span>
        <Form>
          <Box className={classes.row}>
            <TextField
              className={`font-weight-bold font-size-lg  rounded text-dark px-2 py-1 ${classes.input}`}
              label="New Password:"
              required
              name="newpwd"
              type="password"
              value={pwds.newpwd || ''}
              onChange={handleChange}
              onBlur={handleFieldValidation}
              error={!!userErrors.newpwd}
              helperText={userErrors.newpwd}
            />
          </Box>
        </Form>
      </div>
      <div className="d-flex align-items-center bg-light-info rounded p-5 mb-9">
        <span className="svg-icon svg-icon-danger mr-5 svg-icon-lg">
          <SVG
            src={toAbsoluteUrl('/media/svg/icons/Communication/Thumbtack.svg')}
            title="Password Required"></SVG>
        </span>
        <Form>
        <Box className={classes.row}>
          <TextField
            className={`font-weight-bold font-size-lg  rounded text-dark px-2 py-1 ${classes.input}`}
            label="Re-enter New Password"
            required
            name="newpwd2"
            type="password"
            value={pwds.newpwd2 || ''}
            onChange={handleChange}
            onBlur={handleFieldValidation}
            error={!!userErrors.newpwd2}
            helperText={
              pwds.newpwd2 === pwds.newpwd ? userErrors.newpwd2 : `The passwords do not match`
            }
          />
          </Box>
          </Form>
          </div>
          <Box className={classes.row}>
          <button
            id="kt_login_signin_submit"
            type="submit"
            onClick={handleSubmit}
            disabled={!isValid}
            className={`btn btn-warning font-weight-bold px-9 py-4 mr-10 my-3 `}>
            <span>Submit</span>
            {loading && (
              <span className="ml-3 spinner spinner-white"></span>
            )}
          </button>
        
          <button
            id="kt_login_signin_submit"
            type="button"
            onClick={handleCancel}
            className={`btn btn-info font-weight-bold px-9 py-4 mr-0 my-3 `}>
            <span>Cancel</span>
          </button>
        </Box>
        </>
      
      );
};
    