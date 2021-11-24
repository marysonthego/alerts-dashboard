import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import clsx from 'clsx';
import {
  makeStyles,
  TextField,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import Snackbar from 'app/helpers/Snackbar';
import { CellNumberFormat } from 'app/helpers/Formatters';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from 'app/helpers/AssetHelpers';
import { initUserErrors } from 'app/helpers/Initializers';
import {
  FormValidation,
  fieldsValidation
} from 'app/helpers/FormValidation';
import {
  updateErrorState
} from 'app/redux/errorsSlice';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  updateUserState,
  selectCurrentUser,
} from 'app/redux/userSlice';
import { useUpdateCustomerMutation } from 'app/redux/apiSlice';


const useStyles = makeStyles(theme => ({
  input: {
    border: 'none',
    background: '#f5f5f6',
  },
}));

export const ProfileForm = ({ form, handlePassword, isADuplicate }) => {
  const [updateCustomer] = useUpdateCustomerMutation();
  const userState = useSelector(selectCurrentUser);
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const [pwds, setPwds] = useState({});
  const classes = useStyles();

  const [newUser, setNewUser] = useState(userState);
  const [newUserErrors, setNewUserErrors] = useState(initUserErrors);

  const { enqueueSnackbar } = useSnackbar();

  const handleOnChange = e => {
    let field = e.target.name;
    let value = e.target.value;
    let item = '';
    item += value;

    if (field === 'pwd' || field === 'pwd2' || field === 'newpwd' || field === 'newpwd2')
    {
      setPwds({
        ...pwds,
        [field]: item
      })
    } else
    {
      setNewUser({
        ...newUser,
        [field]: item
      })
    }
  };

  //Cell number to be formatted
  const handleCellChange = e => {
    let field = e.target.name;
    let value = e.target.value;
    setNewUser({
      ...newUser,
      [field]: value
    })
  };

  const handleOnBlur = e => {
    let field = e.target.name;
    let value = e.target.value;
    let required = e.target.required;

    if (field === 'cell')
    {
      value = newUser.cell;
    }

    if (value === '' && !required)
    {
      return;
    };
    //fix capitalization
    let val = '';
    if (field === 'firstname' ||
      field === 'lastname' ||
      field === 'city' ||
      field === 'st')
    {
      if (value)
      {
        if (field === 'st')
        {
          val = value.toUpperCase();
        } else
        {
          val = value.toLowerCase();
          let nameArray = val.split(' ');
          val = '';
          nameArray.forEach(function (element) {
            val += element[0].toUpperCase() + element.slice(1) + ' ';
          });
          val = val.trimEnd();
        }
        setNewUser({
          ...newUser,
          [field]: val
        })
      }
    }

    if (typeof fieldsValidation[field] !== 'undefined')
    {
      let error =
        FormValidation(field, value, fieldsValidation, required, isADuplicate) || '';
      setNewUserErrors({
        ...newUserErrors,
        [field]: error
      })
      dispatch(updateErrorState(newUserErrors));
      if (field === 'pwd2' && newUserErrors.pwd2 === '')
      {
        handlePassword(value);
      }
      if (error !== '')
      {
        setIsValid(false);
      } else
      {
        setIsValid(true);
      }
    }
    dispatch(updateUserState(newUser));
    dispatch(updateErrorState(newUserErrors));
  };

  const ChangePassword = () => {
    enqueueSnackbar('You must login to change your password.', {
      variant: 'warning',
    });
    history.push({
      pathname: '/password',
    });
  };

  const goToDashboard = () => {
    history.push({
      pathname: '/dashboard',
    });
  };

  const SaveChanges = () => {
    if(newUser.email === '' || newUser.cell === '' || newUser.firstname === '' || newUser.lastname === '') {
      let snackType='missingRequiredField'
      enqueueSnackbar(null, {
        persist: false,
        content: key => <Snackbar id={ key } message={ snackType } />
      });
    }
    updateCustomer(newUser).unwrap()
      .then((payload) => {
        //console.log(`updateCustomer fulfilled payload: `, payload)
        dispatch(updateUserState(payload));
        goToDashboard();
      })
      .catch((error) => {
        console.error('updateCustomer rejected error: ', error);
        dispatch(updateErrorState({ cell: 'Duplicate cell' }));
        dispatch(updateErrorState({ email: 'Duplicate email' }));

        let snackType='signUpError'
        enqueueSnackbar(null, {
          persist: false,
          content: key => <Snackbar id={ key } message={ snackType } />
        });
      });
  }

  return (
    <div style={{width: '350px'}} className="d-flex flex-column align-items-center card-body pt-0" >
      <div className="d-flex align-items-center mb-9 bg-light-warning rounded p-5">
        <span className="svg-icon svg-icon-dark mr-5 svg-icon-lg">
          <SVG
            src={ toAbsoluteUrl('/media/svg/icons/Text/Font.svg') }
            title="First Name Required"></SVG>
        </span>
        <div className="d-flex flex-column flex-grow-1 mr-2 font-weight-bold text-dark font-size-lg">
          First Name*
        </div>
        <Form>
          <span className="font-weight-bold py-1 font-size-lg">
            <TextField
              className={ `font-weight-bold font-size-lg  rounded text-dark px-2 py-1 ${classes.input}` }
              type="text"
              name="firstname"
              required
              value={ newUser.firstname || '' }
              onChange={ handleOnChange }
              onBlur={ handleOnBlur }
              error={ !!newUserErrors.firstname }
              helperText={ newUserErrors.firstname }
            />
          </span>
        </Form>
      </div>

      <div className="d-flex align-items-center bg-light-warning rounded p-5 mb-9">
        <span className="svg-icon svg-icon-dark mr-5 svg-icon-lg">
          <SVG
            src={ toAbsoluteUrl('/media/svg/icons/Text/Font.svg') }
            title="Last Name Required"></SVG>
        </span>
        <div className="d-flex flex-column flex-grow-1 mr-2 font-weight-bold text-dark font-size-lg">
          Last Name*
        </div>
        <Form>
          <span className="font-weight-bold text-dark-75 py-1 font-size-lg">
            <TextField
              className={ `font-weight-bold font-size-lg rounded px-2 py-1 ${classes.input}` }
              type="text"
              name="lastname"
              required
              value={ newUser.lastname || '' }
              onChange={ handleOnChange }
              onBlur={ handleOnBlur }
              error={ !!newUserErrors.lastname }
              helperText={ newUserErrors.lastname }
            />
          </span>
        </Form>
      </div>

      <div className="d-flex align-items-center bg-light-warning rounded p-5 mb-9">
        <span className="svg-icon svg-icon-dark mr-5 svg-icon-lg">
          <SVG
            src={ toAbsoluteUrl(
              '/media/svg/icons/Communication/Urgent-mail.svg'
            ) }
            title="Email Required"></SVG>
        </span>
        <div className="d-flex flex-column flex-grow-1 mr-2 font-weight-bold text-dark font-size-lg">
          Email Address*
        </div>
        <Form>
          <span className="font-weight-bold text-dark-75 py-1 font-size-lg">
            <TextField
              className={ `font-weight-bold font-size-lg  rounded px-2 py-1 ${classes.input}` }
              type="text"
              name="email"
              required
              value={ newUser.email || '' }
              onChange={ handleOnChange }
              onBlur={ handleOnBlur }
              error={ !!newUserErrors.email }
              helperText={ newUserErrors.email }
            />
          </span>
        </Form>
      </div>

      <div className="d-flex align-items-center bg-light-warning rounded p-5 mb-9">
        <span className="svg-icon svg-icon-dark mr-5 svg-icon-lg">
          <SVG
            src={ toAbsoluteUrl('/media/svg/icons/Devices/iPhone-X.svg') }
            title="Cell Phone Required"></SVG>
        </span>
        <div className="d-flex flex-column flex-grow-1 mr-2 font-weight-bold text-dark font-size-lg">
          Cell Phone*
        </div>
        <Form>
          <span className="font-weight-bold text-dark-75 py-1 font-size-lg">
            <TextField
              className={ `font-weight-bold font-size-lg  rounded px-2 py-1 ${classes.input}` }
              name="cell"
              required
              value={ newUser.cell || '' }
              type="tel"
              onChange={ handleCellChange }
              onBlur={ handleOnBlur }
              helperText={ newUserErrors.cell || '' }
              error={ !!newUserErrors.cell }
              InputProps={ {
                inputComponent: CellNumberFormat,
              } }
            />
          </span>
        </Form>
      </div>

      <div className="d-flex align-items-center bg-light-warning rounded p-5 mb-9">
        <span className="svg-icon svg-icon-dark mr-5 svg-icon-lg">
          <SVG
            src={ toAbsoluteUrl('/media/svg/icons/General/Other2.svg') }
            title="Address 1"></SVG>
        </span>
        <div className="d-flex flex-column flex-grow-1 mr-2 font-weight-bold text-dark text-hover-primary font-size-lg">
          Address Line 1
        </div>
        <Form>
          <span className="font-weight-bold text-dark-75 py-1 font-size-lg">
            <TextField
              className={ `font-weight-bold font-size-lg  rounded px-2 py-1 ${classes.input}` }
              type="text"
              name="addr1"
              value={ newUser.addr1 || '' }
              onChange={ handleOnChange }
              onBlur={ handleOnBlur }
              error={ !!newUserErrors.addr1 }
              helperText={ newUserErrors.addr1 }
            />
          </span>
        </Form>
      </div>

      <div className="d-flex align-items-center mb-9 bg-light-warning rounded p-5">
        <span className="svg-icon svg-icon-dark mr-5 svg-icon-lg">
          <SVG
            src={ toAbsoluteUrl('/media/svg/icons/General/Other2.svg') }
            title="Address 2"></SVG>
        </span>
        <div className="d-flex flex-column flex-grow-1 mr-2 font-weight-bold text-dark font-size-lg">
          Address Line 2
        </div>
        <Form>
          <span className="font-weight-bold text-dark py-1 font-size-lg">
            <TextField
              className={ `font-weight-bold font-size-lg rounded px-2 py-1 ${classes.input}` }
              type="text"
              name="addr2"
              value={ newUser.addr2 || '' }
              onChange={ handleOnChange }
              onBlur={ handleOnBlur }
              error={ !!newUserErrors.addr2 }
              helperText={ newUserErrors.addr2 }
            />
          </span>
        </Form>
      </div>

      <div className="d-flex align-items-center bg-light-warning rounded p-5 mb-9">
        <span className="svg-icon svg-icon-dark mr-5 svg-icon-lg">
          <SVG
            src={ toAbsoluteUrl('/media/svg/icons/Home/Flower3.svg') }
            title="City"></SVG>
        </span>
        <div className="d-flex flex-column flex-grow-1 mr-2 font-weight-bold text-dark font-size-lg ">
          City
        </div>
        <Form>
          <span className="font-weight-bold text-dark-75 py-1 font-size-lg">
            <TextField
              className={ `font-weight-bold font-size-lg rounded px-2 py-1 ${classes.input}` }
              type="text"
              name="city"
              value={ newUser.city || '' }
              onChange={ handleOnChange }
              onBlur={ handleOnBlur }
              error={ !!newUserErrors.city }
              helperText={ newUserErrors.city }
            />
          </span>
        </Form>
      </div>

      <div className="d-flex align-items-center bg-light-warning rounded p-5 mb-9">
        <span className="svg-icon svg-icon-dark mr-5 svg-icon-lg">
          <SVG
            src={ toAbsoluteUrl('/media/a4g/Flag.svg') }
            title="State"></SVG>
        </span>
        <div className="d-flex flex-column flex-grow-1 mr-2 font-weight-bold text-dark font-size-lg mb-1">
          State
        </div>
        <Form>
          <span className="font-weight-bold text-dark-75 py-1 font-size-lg">
            <TextField
              className={ `font-weight-bold font-size-lg rounded px-2 py-1 ${classes.input}` }
              type="text"
              name="st"
              value={ newUser.st || '' }
              onChange={ handleOnChange }
              onBlur={ handleOnBlur }
              error={ !!newUserErrors.st }
              helperText={ newUserErrors.st }
            />
          </span>
        </Form>
      </div>

      <div className="d-flex align-items-center bg-light-warning rounded p-5 mb-9">
        <span className="svg-icon svg-icon-dark mr-5 svg-icon-lg">
          <SVG
            src={ toAbsoluteUrl('/media/svg/icons/Home/Mailbox.svg') }
            title="Zip Code"></SVG>
        </span>
        <div className="d-flex flex-column flex-grow-1 mr-2 font-weight-bold text-dark font-size-lg mb-1">
          Zip Code
        </div>
        <Form>
          <span className="font-weight-bold text-dark-75 py-1 font-size-lg">
            <TextField
              className={ `font-weight-bold font-size-lg rounded px-2 py-1 ${classes.input}` }
              type="text"
              name="zip"
              value={ newUser.zip || '' }
              onChange={ handleOnChange }
              onBlur={ handleOnBlur }
              error={ !!newUserErrors.zip }
              helperText={ newUserErrors.zip }
            />
          </span>
        </Form>
      </div>

      { form === 'RegisterStep' && newUser.custid === 0 ?
        <>
          <div className="d-flex align-items-center bg-light-warning rounded p-5 mb-9">
            <span className="svg-icon svg-icon-dark mr-5 svg-icon-lg">
              <SVG
                src={ toAbsoluteUrl('/media/svg/icons/Communication/Thumbtack.svg') }
                title="Password Required"></SVG>
            </span>
            <div className="d-flex flex-column flex-grow-1 mr-2 font-weight-bold text-dark font-size-lg mb-1">
              Password*
            </div>
            <Form>
              <span className="font-weight-bold text-dark-75 py-1 font-size-lg">
                <TextField
                  className={ `font-weight-bold font-size-lg rounded px-2 py-1 ${classes.input}` }

                  required
                  type="password"
                  name="pwd"
                  value={ pwds.pwd || '' }
                  onChange={ handleOnChange }
                  onBlur={ handleOnBlur }
                  error={ !!newUserErrors.pwd }
                  helperText={ newUserErrors.pwd }
                />
              </span>
            </Form>
          </div>
          <div className="d-flex align-items-center bg-light-warning rounded p-5 mb-9">
            <span className="svg-icon svg-icon-dark mr-5 svg-icon-lg">
              <SVG
                src={ toAbsoluteUrl('/media/svg/icons/Communication/Thumbtack.svg') }
                title="Password Required"></SVG>
            </span>
            <div className="d-flex flex-column flex-grow-1 mr-2 font-weight-bold text-dark font-size-lg mb-1">
              Password*
            </div>
            <Form>
              <span className="font-weight-bold text-dark-75 py-1 font-size-lg">
                <TextField
                  className={ `font-weight-bold font-size-lg rounded px-2 py-1 ${classes.input}` }

                  required
                  name="pwd2"
                  type="password"
                  value={ pwds.pwd2 || '' }
                  onChange={ handleOnChange }
                  onBlur={ handleOnBlur }
                  error={ !!newUserErrors.pwd2 }
                  helperText={
                    newUser.pwd2 === newUser.pwd ? newUserErrors.pwd2 : `The passwords do not match`
                  }
                />
              </span>
            </Form>
          </div>
        </>
        :
        <div>
          <div className={ clsx(classes.row, classes.navButtons) }>
            <button
              type="button"
              onClick={ ChangePassword }
              id="kt-profile"
              className={ `btn btn-info font-weight-bold px-9 py-4 my-3` }>
              <span>Change Password</span>
            </button>
          </div>
          <div className={ clsx(classes.row, classes.navButtons) }>
            <button
              type="button"
              onClick={ SaveChanges }
              disabled={ !isValid }
              id="kt-profile"
              className={ `btn btn-warning font-weight-bold px-9 py-4 my-3` }>
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      }
    </div>
  );
};
