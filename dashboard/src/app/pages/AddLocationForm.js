import React, { useState } from 'react';
import { apiSlice, useAddLocationMutation, useFindZipMutation } from 'app/redux/apiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserCustid, selectUserCell } from 'app/redux/userSlice';
import { initLocation, initLocationErrors } from 'app/helpers/Initializers';
import { FormValidation, fieldsValidation } from 'app/helpers/FormValidation';
import { updateBackEnabled, updateNextEnabled } from 'app/redux/stepperSlice';
import SVG from 'react-inlinesvg';
import { useSnackbar } from 'notistack';
import {
  TextField,
  Button,
  makeStyles,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles ({
  container: {
    display: 'flex',
    marginBottom: '2em',
    flexDirection: 'column',
    justifyContent: 'flexStart',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexShrink: '1',

    '@media (max-width: 760px)': {
      flexDirection: 'column',
      justifyContent: 'flexStart',
    },
  },
  textfield: {
    marginRight: '1rem',
  },
  hr: {
    border: '0px',
    width: '100%',
    height: '2px',
  },
});

export const AddLocationForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const custid = useSelector(selectUserCustid);
  const cell = useSelector(selectUserCell);
  const [canSave, setCanSave] = useState(false);
  const [location, setLocation] = useState(initLocation);
  const [locationErrors, setLocationErrors] = useState(initLocationErrors);
  const { enqueueSnackbar } = useSnackbar();
  const [addLocation] = useAddLocationMutation();
  const [findZip] = useFindZipMutation();


  const HandleChange = (e) => {
    let field = e.target.name;
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setLocation(prev => {
      return { ...prev, [field]: value };
    });
  };

  function handleLoctionsRefetch ({ custid }) {
    // has the same effect as `refetch` for the associated query
    dispatch(
      apiSlice.endpoints.getLocationsByCustid.initiate(custid,
        { subscribe: false, forceRefetch: true }
      )
    );
  };

  const OnSaveLocationClicked = async () => {
    if (location.weatheralert !== true) location.weatheralert = false;
    if (location.virusalert !== true) location.virusalert = false;
    if (location.airalert !== true) location.airalert = false;
    let loc = {
      custid: custid,
      cell: cell,
      city: location.city,
      st: location.st,
      nickname: location.nickname,
      weatheralert: location.weatheralert,
      virusalert: location.virusalert,
      airalert: location.airalert,
    }
    let zip;
    let zipResponse = 200;
    try
    {
      await findZip(loc).unwrap()
        .then((payload) => {
          zip = payload;
          loc = { ...loc, zip: zip };
        })
      setLocation(prev => {
        return { ...prev, loc };
      });
    } catch (err)
    {
      console.log(`err: `, err);
      const message = JSON.stringify(err.data.msg) + `  Did you spell it correctly?`;
      enqueueSnackbar(message, {
        variant: 'info',
        autoHideDuration: 5000,
      });
      setLocationErrors(prev => (
        prev = { ...prev, city: 'City not found for State', st: 'State' }
      ));
      zipResponse = 404;
    };
    if (zipResponse === 200)
    {
      try
      {
        await addLocation(loc).unwrap()
          .then((payload) => {
            console.log(`addLocation payload: `, payload);
            dispatch(updateNextEnabled(true));
            dispatch(updateBackEnabled(true));
            //dispatch(addNewLocation(loc));
            setLocation(initLocation);
          });
      } catch (err)
      {
        const message = 'City is already in your list. \nYou can change the alerts for it below:';
        enqueueSnackbar(message, {
          variant: 'info',
          autoHideDuration: 5000,
        });
        setLocationErrors(prev => (
          { ...prev, city: 'Duplicate City' }
        ))
      };
    };
    handleLoctionsRefetch({ custid: custid });
    console.log(`AddLocationForm onSaveLocationClicked loc: `, loc);
    return;
  };

  const HandleOnBlur = async (e) => {
    let field = e.target.name;
    let value = e.target.value;

    if (value === '')
      return;

    let val = '';
    if (field === 'st' || field === 'city' || field === 'nickname')
    {
      if (field === 'st')
      {
        val = value.toUpperCase();
      }
      if (field === 'city' || field === 'nickname')
      {
        val = value.toLowerCase();
        let cityArray = val.split(' ');
        val = '';
        cityArray.forEach(function (element) {
          val += element[0].toUpperCase() + element.slice(1) + ' ';
        });
        val = val.trimEnd();
      }
      setLocation({
        ...location,
        [field]: val
      })
    } else
    {
      setLocation({
        ...location,
        [field]: value
      })
    }
    if (typeof fieldsValidation[field] !== 'undefined')
    {
      let isDuplicate = false;
      const error =
        FormValidation(field, value, fieldsValidation, isDuplicate) || '';
      setLocationErrors({
        ...locationErrors, [field]: error
      })
      let { ...newLocErrors } = locationErrors;
      newLocErrors[field] = error;
      setLocationErrors(newLocErrors);

      setCanSave(Boolean(location.city) && Boolean(location.st));
    };
  }; // handleValidation

  return (
    
    <Box sx={{ width: '100%' }}>

      <div className={ classes.row }>
        <TextField
          className={ classes.textfield }
          autoFocus
          label="City*"
          error={ !!locationErrors.city }
          name="city"
          type="text"
          value={ location.city || '' }
          onChange={ HandleChange }
          onBlur={ HandleOnBlur }
          helperText={ locationErrors.city }
        />

        <TextField
          className={ classes.textfield }
          label="State*"
          error={ !!locationErrors.st }
          name="st"
          type="text"
          value={ location.st || '' }
          onChange={ HandleChange }
          onBlur={ HandleOnBlur }
          helperText={ locationErrors.st }
        />

        { location.zip && (
          <TextField
            className={ classes.textfield }
            readOnly
            label="Zip"
            name="rozip"
            type="text"
            value={ location.zip || '' }
          />
        ) }

        <TextField
          className={ classes.textfield }
          label="Nickname"
          name="nickname"
          type="text"
          value={ location.nickname || '' }
          onChange={ HandleChange }
          onBlur={ HandleOnBlur }
        />
      </div>

      <div className={ classes.row } >
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                name="weatheralert"
                color="primary"
                checked={ location.weatheralert || false }
                onChange={ HandleChange }
                aria-label="weather checkbox"
              />
            }
            label="Weather"
            style={ { color: '#000000' } }
          />
          <FormControlLabel
            control={
              <Checkbox
                name="virusalert"
                color="primary"
                checked={ location.virusalert || false }
                onChange={ HandleChange }
                aria-label="Covid checkbox"
              />
            }
            label="Covid"
            style={ { color: '#000000' } }
          />
          <FormControlLabel
            control={
              <Checkbox
                name="airalert"
                color="primary"
                checked={ location.airalert || false }
                onChange={ HandleChange }
                aria-label="Air Quality checkbox"
              />
            }
            label="Air Quality"
            style={ { color: '#000000' } }
          />
        </FormGroup>
      </div>
      <div className="card-toolbar text-center mt-5 classes.page">
        <span className="svg-icon svg-icon-md svg-icon-white">
          <Button
            className="btn btn-primary font-weight-bolder font-size-sm"
            disabled={ !canSave }
            style={ { background: '#f9aa33' } }
            onClick={ OnSaveLocationClicked }>
            <SVG
              src="/media/a4g/marker1.svg"
              className="max-h-70px svg-icon-lg svg-icon-white"
            />
            &nbsp;&nbsp;Save Location
          </Button>
        </span>
      </div>
      <hr className={ classes.hr } />
      </Box>
  );
};
