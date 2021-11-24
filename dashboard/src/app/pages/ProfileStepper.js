import React, {
  forwardRef,
  createRef,
  useState
} from 'react';
import { Link } from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  updateActiveStep,
  selectActiveStep,
  selectIsValid,
  selectBackEnabled,
  selectNextEnabled,
  updateNextEnabled,
  updateBackEnabled
} from 'app/redux/stepperSlice';
import {
  updateUserState,
  selectCurrentUser,
} from 'app/redux/userSlice';
import {
  updateErrorState,
} from 'app/redux/errorsSlice';
import {
  useAddCustomerMutation,
  useUpdateCustomerMutation,
} from 'app/redux/apiSlice.js';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import Snackbar from 'app/helpers/Snackbar';
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  makeStyles,
  IconButton,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import { RegisterStep } from 'app/pages/RegisterStep';
import { LocationsStep } from 'app/pages/LocationsStep';
import { FriendsStep } from 'app/pages/FriendsStep';
import { SummaryStep } from 'app/pages/SummaryStep';
import { DonationStep } from 'app/pages/DonationStep';
import { Success } from 'app/pages/Success';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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
    width: '80%',
    height: '1px',
  },
}));
const stepLabels = [
  'Your Info',
  'Locations & Alerts',
  'Invite Family & Friends',
  'Alerts Summary',
  'Support Us!',
];
export const ProfileStepper = () => {
  const dispatch = useDispatch();
  const [pwd, setPwd] = useState('');
  const userState = useSelector(selectCurrentUser);
  const isValid = useSelector(selectIsValid);
  const [addCustomer] = useAddCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [isADuplicate, setIsADuplicate] = useState(false);
  const classes = useStyles();
  const activeStep = useSelector(selectActiveStep);
  const backEnabled = useSelector(selectBackEnabled);
  const nextEnabled = useSelector(selectNextEnabled);
  const [Back, setBack] = useState(enableBack);
  const [Next, setNext] = useState(enableNext);
  const refEB = createRef(); //Enable Back
  const refDB = createRef(); //Disable Back
  const refEN = createRef(); //Enable Next
  const refDN = createRef(); //Disable Next
  const { enqueueSnackbar } = useSnackbar();
  const HandleNextButtonClick = () => {
    let prevStep = activeStep;
    switch (prevStep)
    {
      case 0:
        if (backEnabled)
          setBack(enableBack);
        if (nextEnabled)
          setNext(enableNext);
        if (isValid && userState.custid === 0)
        {
          let { ...newUser } = userState;
          newUser = { ...newUser, pwd: pwd };
          if(newUser.cell === "" || newUser.email === "" || newUser.pwd === "" || newUser.firstname === "" || newUser.lastname === "") {
            let snackType='missingRequiredField'
            enqueueSnackbar(null, {
              persist: true,
              content: key => <Snackbar id={ key } message={ snackType } />
            });
          }
          addCustomer(newUser).unwrap()
            .then((payload) => {
              console.log(`addCustomer fulfilled payload: `, payload)
              dispatch(updateUserState(payload));
              dispatch(updateNextEnabled(true));
              dispatch(updateBackEnabled(true));
              setNext(enableNext);
              setBack(enableBack);
              dispatch(updateActiveStep(activeStep + 1));
            })
            .catch((error) => {
              let snackType = '';
              console.error('addCustomer rejected error: ', error);
              if (error.originalStatus === 404) {
                snackType = '500ServerError';
              }
              else {
                dispatch(updateErrorState({ cell: 'Duplicate cell' }));
                dispatch(updateErrorState({ email: 'Duplicate email' }));
                setIsADuplicate(true);
                snackType = 'signUpError';
              }
              dispatch(updateActiveStep(activeStep - 1));
              enqueueSnackbar(null, {
                persist: true,
                content: key => <Snackbar id={ key } message={ snackType } />
              });
            });
        } else if (userState.custid > 0)
        {
          dispatch(updateActiveStep(activeStep + 1));
        }
        break;
      default:
        dispatch(updateNextEnabled(true));
        dispatch(updateBackEnabled(true));
        setNext(enableNext);
        setBack(enableBack);
        dispatch(updateActiveStep(activeStep + 1));
        break;
    };
  };
  const handlePassword = (value) => {
    setPwd(value);
  };
  // Go to prev step
  const handleBackButtonClick = async () => {
    let lastStep = activeStep;
    dispatch(updateActiveStep(activeStep - 1));
    switch (lastStep)
    {
      case 1:
        if (isValid)
        {
          let { ...newUser } = userState; //copy object
          updateCustomer(newUser).unwrap()
            .then((payload) => {
              //console.log(`updateCustomer fulfilled payload: `, payload)
              dispatch(updateUserState(payload));
              dispatch(updateNextEnabled(true));
              dispatch(updateBackEnabled(false));
              setNext(enableNext);
              setBack(disableBack);
            })
            .catch((error) => {
              console.error('updateCustomer rejected error: ', error);
              dispatch(updateErrorState({ cell: 'Duplicate cell' }));
              dispatch(updateErrorState({ email: 'Duplicate email' }));
              dispatch(updateActiveStep(activeStep - 1));
              enqueueSnackbar(`email-cell combination is already in use`, {
                variant: 'error',
              });
            });
        }
        dispatch(updateBackEnabled(true));
        setBack(enableBack);
        break;
      default:
        dispatch(updateBackEnabled(true));
        setBack(enableBack);
        dispatch(updateActiveStep(activeStep - 1));
        break;
    }
  };
  const walkSteps = activeStep => {
    switch (activeStep)
    {
      case 0:
        return (
          <div>
            <hr className={ classes.hr } />
            <RegisterStep form='RegisterStep' className="classes.page" handlePassword={ handlePassword } isADuplicate={ isADuplicate } />
          </div>
        );
      case 1:
        return (
          <div>
            <LocationsStep step={ activeStep } className="classes.page" />
          </div>
        );
      case 2:
        return (
          <div>
            <FriendsStep step={ activeStep } />
          </div>
        );
      case 3:
        return (
          <div>
            <SummaryStep />
            <hr className={ classes.hr } />
            <LocationsStep step={ activeStep } className="classes.page" />
            <hr className={ classes.hr } />
            <FriendsStep step={ activeStep } />
            <hr className={ classes.hr } />
          </div>
        );
      case 4:
        return (
          <div>
            <DonationStep />
          </div>
        );
      default:
        break;
    }
  };
  return (
    <>
      <div className="d-flex flex-column flex-root bg-white">
        <Link to="/" className="flex-column-auto mt-5 pb-lg-0 ">
          <img
            alt="Alerts for Good"
            className="max-h-70px"
            src="/media/a4g/a4g-logo-white.png"
          />
        </Link>
        <div className="bg-white">
          { activeStep === stepLabels.length ? (
            <Success />
          ) : (
            // Last Component
            <>
              {/* begin::stepper */ }
              
              <Box>
                <Typography
                  variant="h4"
                  align="center"
                  className="font-weight-bold text-dark-50">
                  { stepLabels[activeStep] }
                </Typography>
              </Box>
              <Stepper activeStep={ activeStep } alternativeLabel>
                { stepLabels.map(stepLabel => (
                  <Step key={ stepLabel }>
                    <StepLabel>{ stepLabel }</StepLabel>
                  </Step>
                )) }
              </Stepper>
              
              {/* forms go here */ }
              <Box
                p={ 0 }
                m={ 0 }
                display="flex"
                flexWrap="nowrap"
                flexDirection="column"
                justifyContent="center">
                { walkSteps(activeStep) }
              </Box>
              
              <div className={ clsx(classes.row, classes.navButtons) }>
                <IconButton
                  key={ 'IB' + 1 }
                  aria-label="back"
                  onClick={ e => handleBackButtonClick({ e }) }
                  disabled={ !backEnabled }>
                  { backEnabled
                    ? <Back ref={ refEB } />
                    : <Back ref={ refDB } /> }
                </IconButton>
                <IconButton
                  key={ 'IB' + 2 }
                  aria-label="next"
                  onClick={ HandleNextButtonClick }
                  disabled={ !nextEnabled }
                  label="next">
                  { nextEnabled
                    ? <Next ref={ refEN } />
                    : <Next ref={ refDN } /> }
                </IconButton>
              </div>
            </>
          ) }
        </div>
      </div>
    </>
  );
};
//refDB
export const disableBack = forwardRef((_props, ref) => {
  return (
    <ArrowBackIosIcon ref={ ref }
      style={ { width: '48px', height: '48px', fill: '#9e9e9e' } }
      className="mt-1 text-muted font-weight-bold font-size-md"
    />
  )
});
//refEB
export const enableBack = forwardRef((_props, ref) => {
  return (
    <ArrowBackIosIcon ref={ ref }
      style={ { width: '48px', height: '48px', fill: '#f9aa33' } }
      className="mt-1 text-muted font-weight-bold font-size-md"
    />
  )
});
//refEN
export const enableNext = forwardRef((_props, ref) => {
  return (
    <ArrowForwardIosIcon ref={ ref }
      style={ { width: '48px', height: '48px', fill: '#f9aa33' } }
      className="mt-1 text-muted font-weight-bold font-size-md"
    />
  )
});
//refDN
export const disableNext = forwardRef((_props, ref) => {
  return (
    <ArrowForwardIosIcon ref={ ref }
      style={ { width: '48px', height: '48px', fill: '#9e9e9e' } }
      className="mt-1 text-muted font-weight-bold font-size-md"
    />
  )
});
