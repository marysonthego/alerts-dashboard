/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import { useSessionStorage } from 'app/helpers/SessionStorageHelpers';
import { ProfileForm } from 'app/pages/ProfileForm';
import { updateUser } from 'app/components/AuthCrud';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import {
  initUser,
  initUserErrors,
} from 'app/helpers/Initializers';

const useStyles = makeStyles(theme => ({
  page: {
    marginBottom: '5em',
    marginLeft: '5em',
    marginRight: '1em',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexShrink: '1',
  },
  hr: {
    border: '0px',
    width: '100%',
    background: '#bbbbbb',
    height: '1px',
  },
}));

export const EditProfilePage = ({ className }) => {
  const [user, setUser] = useSessionStorage("user", initUser);
  const [userErrors, setUserErrors] = useSessionStorage("usererrors", initUserErrors);
  const { enqueueSnackbar, } = useSnackbar();
  const form = 'editProfile';
  const [isValid, setIsValid] = useState(true);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    setUser(user);
    setUserErrors(userErrors);
    //console.log(`EditProfilePage useEffect user:`, user);
  });

   const goToDashboard = () => {
    history.push({
      pathname: '/dashboard', 
    });
  };

  async function profileCheck () {
    //console.log(`profileCheck userErrors: `, userErrors);

    let check =
      userErrors.firstname.length === 0 &&
      !userErrors.lastname.length > 0 &&
      !userErrors.email.length > 0 &&
      !userErrors.cell.length > 0 &&
      !userErrors.pwd.length > 0 &&
      !userErrors.pwd2.length > 0 &&
      user.pwd === user.pwd2;

    if (check) {
      setIsValid(true);
      const updateMsg = await updateUser(user);
      if (updateMsg.status === 409) {
        //cell already used
        //console.log(`409 alert`);
        enqueueSnackbar('Cell phone number is already in use.', { 
          variant: 'error',
      });
        setIsValid(false);
      } else {
        if (updateMsg.status !== 200) {
          //console.log(`user update failed msg:`, updateMsg);
          enqueueSnackbar('Profile update failed. Please try again.', { 
            variant: 'error',
          });
        }
      } 
    } else {
      setIsValid(false);
    }
  };

  return (
    <>
      <div className={`card card-custom ${className}`}>
        {/* Header */}
        <div className="card-header border-0">
          <h3 className="card-title font-weight-bolder text-dark">
            Edit Your Profile
          </h3>
        </div>

        {/* Body */}
        <ProfileForm form={form} profileCheck={profileCheck}/>
        <div className="d-flex align-items-center mb-9 bg-light-warning rounded p-5">

        <div className={clsx(classes.row, classes.navButtons)}>
          <button
            type="button"
            onClick={goToDashboard}
            disabled={!isValid}
            id="kt-profile"
            className={`btn btn-warning font-weight-bold px-9 py-4 my-3`}>
            <span>Submit</span>
          </button>
          </div>
        </div>
      </div>
    </>
  );
};
