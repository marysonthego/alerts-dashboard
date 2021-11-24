import React, { useState } from 'react'
import { apiSlice, useAddFriendMutation, useFindZipMutation } from 'app/redux/apiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserCustid } from 'app/redux/userSlice';
import { CellNumberFormat } from 'app/helpers/Formatters';
import { initFriend, initFriendErrors } from 'app/helpers/Initializers';
import { FormValidation, fieldsValidation } from 'app/helpers/FormValidation';
import { updateBackEnabled, updateNextEnabled } from 'app/redux/stepperSlice';
import SVG from 'react-inlinesvg';
import { useSnackbar } from 'notistack';
import {
  TextField,
  Button,
  makeStyles,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    marginBottom: '2em',
    marginLeft: '2em',
    flexDirection: 'column',
    justifyContent: 'center',
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
}));

export const AddFriendForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const custid = useSelector(selectUserCustid);
  const [canSave, setCanSave] = useState(false);
  const [friend, setFriend] = useState(initFriend);
  const [friendErrors, setFriendErrors] = useState(initFriendErrors);
  const { enqueueSnackbar } = useSnackbar();
  const [addFriend] = useAddFriendMutation();
  const [findZip] = useFindZipMutation();

  const HandleChange = (e) => {
    let field = e.target.name;
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFriend(prev => {
      return { ...prev, [field]: value };
    });
  };

  //cell event handler
  const HandleCellChange = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    setFriend({
      ...friend,
      [field]: value
    })
  };

  function handleFriendsRefetch ({ custid }) {
    // has the same effect as `refetch` for the associated query
    dispatch(
      apiSlice.endpoints.getFriendsByCustid.initiate(custid,
        { subscribe: false, forceRefetch: true }
      )
    );
  };

  const onSaveFriendClicked = async () => {
    if (friend.weatheralert !== true) friend.weatheralert = false;
    if (friend.virusalert !== true) friend.virusalert = false;
    if (friend.airalert !== true) friend.airalert = false;
    let fr = {
      firstname: friend.firstname,
      custid: custid,
      cell: friend.cell,
      city: friend.city,
      st: friend.st,
      weatheralert: friend.weatheralert,
      virusalert: friend.virusalert,
      airalert: friend.airalert,
    }
    let zip;
    let zipResponse = 200;
    try
    {
      await findZip(fr).unwrap()
        .then((payload) => {
          zip = payload;
          fr = { ...fr, zip: zip };
        })
      setFriend(prev => {
        return { ...prev, fr };
      });
    } catch (err)
    {
      const message = JSON.stringify(err.data.msg) + ` Did you spell it correctly?`;
      enqueueSnackbar(message, {
        variant: 'info',
        autoHideDuration: 5000,
      });
      setFriendErrors(prev => (
        prev = { ...prev, city: 'City not found for State', st: "State" }
      ));
      zipResponse = 404;
    };
    if (zipResponse === 200)
    {
      try
      {
        await addFriend(fr).unwrap()
          .then((payload) => {
            console.log(`addfriend payload: `, payload);
            dispatch(updateNextEnabled(true));
            dispatch(updateBackEnabled(true));
            //dispatch(addNewFriend(fr));
            setFriend(initFriend);
          });
      } catch (err)
      {
        const message = 'Friend is already in your list. \nAdd another friend!';
        enqueueSnackbar(message, {
          variant: 'info',
          autoHideDuration: 5000,
        });
        setFriendErrors(prev => (
          { ...prev, city: 'Duplicate City' }
        ))
      };
      handleFriendsRefetch({ custid: custid });
      console.log(`AddfriendForm onSavefriendClicked fr: `, fr);
      return;
    };
  }
  const HandleOnBlur = async (e) => {
    let field = e.target.name;
    let value = e.target.value;

    if (field === 'cell')
    {
      value = friend.cell;
    }

    if (value === '')
      return;

    let val = '';
    if (field === 'st' || field === 'city' || field === 'firstname')
    {
      if (field === 'st')
      {
        val = value.toUpperCase();
      }
      if (field === 'city' || field === 'firstname')
      {
        val = value.toLowerCase();
        let cityArray = val.split(' ');
        val = '';
        cityArray.forEach(function (element) {
          val += element[0].toUpperCase() + element.slice(1) + ' ';
        });
        val = val.trimEnd();
      }
      setFriend({
        ...friend,
        [field]: val
      })
    } else
    {
      setFriend({
        ...friend,
        [field]: value
      })
    }
    if (typeof fieldsValidation[field] !== 'undefined')
    {
      let isDuplicate = false;
      const error =
        FormValidation(field, value, fieldsValidation, isDuplicate) || '';
      setFriendErrors({
        ...friendErrors, [field]: error
      })
      let { ...newFrErrors } = friendErrors;
      newFrErrors[field] = error;
      setFriendErrors(newFrErrors);

      setCanSave(Boolean(friend.cell) && Boolean(friend.city) && Boolean(friend.st));
    };
  }; // handleValidation

  return (
    <div className={classes.container}>
      <div className={ classes.row }>
        <TextField
          className={ classes.textfield }
          autoFocus
          required
          label="First name*"
          name="firstname"
          type="text"
          value={ friend.firstname || '' }
          onChange={ HandleChange }
          onBlur={ HandleOnBlur }
        />
        <TextField
          // className={`font-weight-bold font-size-lg  rounded px-2 py-1 ${classes.input}`}
          className={ classes.textfield }
          name="cell"
          label="Cell"
          required
          value={ friend.cell || '' }
          type="tel"
          onChange={ HandleCellChange }
          onBlur={ HandleOnBlur }
          helperText={ friendErrors.cell || '' }
          error={ !!friendErrors.cell }
          InputProps={ {
            inputComponent: CellNumberFormat,
          } }
        />
        <TextField
          className={ classes.textfield }

          label="City*"
          error={ !!friendErrors.city }
          name="city"
          type="text"
          value={ friend.city || '' }
          onChange={ HandleChange }
          onBlur={ HandleOnBlur }
          helperText={ friendErrors.city }
        />

        <TextField
          className={ classes.textfield }
          label="State*"
          error={ !!friendErrors.st }
          name="st"
          type="text"
          value={ friend.st || '' }
          onChange={ HandleChange }
          onBlur={ HandleOnBlur }
          helperText={ friendErrors.st }
        />

        { friend.zip && (
          <TextField
            className={ classes.textfield }
            readOnly
            label="Zip"
            name="rozip"
            type="text"
            value={ friend.zip || '' }
          />
        ) }
      </div>

      <div className="card-toolbar text-center mt-5 classes.page">
        <span className="svg-icon svg-icon-md svg-icon-white">
          <Button
            className="btn btn-primary font-weight-bolder font-size-sm"
            disabled={ !canSave }
            style={ { background: '#f9aa33' } }
            onClick={ onSaveFriendClicked }>
            <SVG
              src="/media/a4g/marker1.svg"
              className="max-h-70px svg-icon-lg svg-icon-white"
            />
            &nbsp;&nbsp;Save friend
          </Button>
        </span>
      </div>
      <hr className={ classes.hr } />
    </div>
  );
};
