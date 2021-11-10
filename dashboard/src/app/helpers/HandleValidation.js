import React from 'react';
import { FormValidation, fieldsValidation } from 'app/helpers/FormValidation';
import { useStickyState } from 'app/components/AuthInit';
import { initUser, initUserErrors } from 'app/helpers/Initializers';
import { checkEmail } from 'app/components/AuthCrud';

export async function HandleValidation(props) {
  const { field, value, form, i } = props;
  const [user, setUser] = useStickyState("user", initUser);

  const [userErrors, setUserErrors] = useStickyState('userErrors',initUserErrors);
  let val = '';

  if (form === 'registerStep' || form === 'editProfile') {
    
    if (value === '') {
      return;
    }
    if (field === 'firstname' || field === 'lastname') {
      val = value.toLowerCase();
      let nameArray = val.split(' ');
      val = '';
      nameArray.forEach(function (element) {
        val += element[0].toUpperCase() + element.slice(1) + ' ';
      });
      val = val.trimEnd();
      setUser(prev => ({
        ...prev,
        [field]: val,
      }));
    } else {
      setUser(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  }

  if (form === 'locationsStep') {
    if (value === '') {
      return;
    }
    let val = '';
    var newLocs = [...user.locations];

    if (field === 'state' || field === 'city') {
      if (field === 'state') {
        val = value.toUpperCase();
      }
      if (field === 'city') {
        val = value.toLowerCase();
        let cityArray = val.split(' ');
        val = '';
        cityArray.forEach(function (element) {
          val += element[0].toUpperCase() + element.slice(1) + ' ';
        });
        val = val.trimEnd();
      }
      newLocs[i][field] = val;
    } else {
      newLocs[i][field] = value;
    }
    //overwrite user.locations array
    setUser(newLocs);
  }

  //validate user.friends
  if (form === 'friendsStep') {
    if (value === '') {
      return;
    }
    let val = '';
    // copy user.friends array to newFriends
    var newFriends = [...user.friends];

    if (
      field === 'state' ||
      field === 'city' ||
      field === 'firstname' ||
      field === 'lastname'
    ) {
      if (field === 'state') {
        val = value.toUpperCase();
      }
      if (field === 'city') {
        val = value.toLowerCase();
        let cityArray = val.split(' ');
        val = '';
        cityArray.forEach(function (element) {
          val += element[0].toUpperCase() + element.slice(1) + ' ';
        });
        val = val.trimEnd();
      }
      if (field === 'firstname' || field === 'lastname') {
        val = value.toLowerCase();
        let nameArray = val.split(' ');
        val = '';
        nameArray.forEach(function (element) {
          val += element[0].toUpperCase() + element.slice(1) + ' ';
        });
        val = val.trimEnd();
      }
      newFriends[i][field] = val;
    } else {
      newFriends[i][field] = value;
    }
    //overwrite user.friends array
    setUser(newFriends);
  }

  // if field needs validation
  if (typeof fieldsValidation[field] !== 'undefined') {
    //console.log(`form: `, form, `field:`, field, `value:`, value);
    let isDuplicate = false;
    if (field.includes('email')) {
      let response = await checkEmail({ value });
      if (response.rowCount > 0) {
        isDuplicate = true;
      }
    }
    const error =
      FormValidation(field, value, fieldsValidation, isDuplicate) || '';

    if (form === 'registerStep' || form === 'editProfile') {
      setUserErrors(prev => ({
        ...prev,
        [field]: error,
      }));
      //console.log(`Top FormValidation field: `, field, `value: `, value);
      //profileCheck();
    }

    if (form === 'friendsStep') {
      let newFriendsErrors = [...userErrors.friends];
      newFriendsErrors[i][field] = error;
      setUser(newFriendsErrors);
      //console.log(`Friends FormValidation field: `, field, `value: `, value);
      //friendsCheck();
    }

    if (form === 'locationsStep') {
      let newLocErrors = [...userErrors.locations];
      newLocErrors[i][field] = error;
      setUserErrors(newLocErrors);
      //console.log(`Locations FormValidation field: `, field, `value: `, value);
      //locationsCheck();
    }

    //validate  DonationStep
    // if (form === 'donation') {
    //   //const error = FormValidation(field, value, fieldsValidation) || '';
    //   setDonationErrors(prev => ({
    //     ...prev,
    //     [field]: error,
    //   }));
    //   donationCheck();
    // }
  }
}
