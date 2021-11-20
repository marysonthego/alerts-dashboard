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
    
    updateIsLoggedInState: (state, action) => {
      const{isLoggedIn} = action.payload;
      const existingUser = state.user;
      if(existingUser){
        if(isLoggedIn) 
          existingUser.isLoggedIn = isLoggedIn;
      }
    },

  resetUserState: (state, action) => {
    return initialState;
  },
}

});

// Action creators generated for each reducer function
export const { addNewCustidState, updateUserState, updateIsLoggedInState, resetUserState } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = state => state.user.user;
export const selectUserEmail = state => state.user.user.email;
export const selectUserCell = state => state.user.user.cell;
export const selectUserCustid = state => state.user.user.custid;
