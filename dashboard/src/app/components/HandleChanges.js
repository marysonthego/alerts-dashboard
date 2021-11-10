import React, { useState } from 'react';
import { useStickyState } from 'app/components/AuthInit';
import { 
  initUser, 
  initUserErrors,
  initFriends
} from 'app/helpers/Initializers';

export const HandleChangeEvent = (i, form, e) => {
  const [user, setUser] =useStickyState("user", initUser);
  const target = e.target;
  const field = target.name;
  const value = target.type === 'checkbox' 
    ? target.checked 
    : target.value;
//console.log(`HandleChange form:`,form,`form.form`,form.form);
  if (
    form.form === 'registerStep' ||
    form.form === 'editProfile' ||
    form.form === 'donation'
  ) {
    let newUser = {...user};
    newUser[field] = value;
    setUser(newUser);
  }
};

// Handle a form change on fields without an event (cell field)
export const HandleChangeProps = props => {
  const { field, value, form, i } = props;
  const [user, setUser] =useStickyState("user", initUser);
  const [friends, setFriends] =useStickyState("friends", initFriends);
  const [userErrors, setUserErrors] = useStickyState(initUserErrors, 'usererrors');

  if (form.form === 'registerStep') {
    console.log(
      `handleChangeProps form: `,
      form.form,
      `field: `,
      field,
      `value: `,
      value
    );
    setUser(prev => ({
      ...prev,
      [field]: value,
    }));
  }

  if (form.form === 'donation') {
    setUser(prev => ({
      ...prev,
      [field]: value,
    }));
  }

  if (form.form === 'friendsStep') {
    console.log(
      `handleChangeProps form: `,
      form.form,
      `i: `,
      i,
      `field: `,
      field,
      `value: `,
      value
    );

    let newFriends = [...friends];
    newFriends[i][field] = value;
    setFriends(newFriends);
  }
}; //handleChangeProps (cell phone field)
