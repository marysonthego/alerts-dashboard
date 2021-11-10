import React, {forwardRef, useState} from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

export const useAlert = () => {
  const [alert, setAlert] = useState({ alertMsg: '', alertTitle: '', alertSeverity: '', ref: '' });
  
  return [
    alert,
    (alertMessage, alertTitle, alertSeverity) => {
      setAlert({ alertMessage, alertTitle, alertSeverity });
    }     
  ]
}

export const AlertWrapper = forwardRef(( props, ref ) => {
  const {alertSeverity, alertTitle, alertMsg} = props;
  return (
  <Alert ref={ref} severity={alertSeverity}>
    <AlertTitle>{alertTitle}</AlertTitle>
    {alertMsg}
  </Alert>
)});

