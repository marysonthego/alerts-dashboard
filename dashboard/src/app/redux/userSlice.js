import { createSlice } from '@reduxjs/toolkit';
import { initUser } from 'app/helpers/Initializers';

const data = {...initUser};

const initialState = { 
   user: {...data},
 };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserState: (state, action) => {
      state.user = action.payload;
    },
      // prepare(isLoggedIn, custid, firstname, lastname, email, cell, addr1, addr2, city, st, zip, usertype) {
      //   return {
      //     payload: {
      //       isLoggedIn, 
      //       custid, 
      //       firstname, 
      //       lastname, 
      //       email, 
      //       cell, 
      //       addr1, 
      //       addr2, 
      //       city, 
      //       st, 
      //       zip, 
      //       usertype
      //     }
      //   };
      // },
    updateUserState: (state, action) => {
      const {isLoggedIn, custid, firstname, lastname, email, cell, addr1, addr2, city, st, zip, usertype } = action.payload;
      const existingUser = state.user;
      if (existingUser) {
        if(isLoggedIn) existingUser.isLoggedIn = isLoggedIn;
        if(custid) existingUser.custid = custid;
        if(firstname) existingUser.firstname = firstname;
        if(lastname) existingUser.lastname = lastname;
        if(email) existingUser.email = email;
        if(cell) existingUser.cell = cell;
        if(addr1) existingUser.addr1 = addr1;
        if(addr2) existingUser.addr2 = addr2;
        if(city) existingUser.city = city;
        if(st) existingUser.st = st;
        if(zip) existingUser.zip = zip;
        if(usertype) existingUser.usertype = usertype;
      }
    },
    updateCustidState: (state, action) => {
      state.user.custid = action.payload.custid;
    },
    updateIsLoggedInState: (state, action) => {
      state.user.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  resetUser: (state, action) => {
    state.user.length = 0;
  },

});

// Action creators generated for each reducer function
export const { addUserState, updateUserState,  updateCustidState, updateIsLoggedInState, resetUser } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = state => state.user.user;
export const selectUserEmail = state => state.user.user.email;
export const selectUserCell = state => state.user.user.cell;
export const selectUserCustid = state => state.user.user.custid;
