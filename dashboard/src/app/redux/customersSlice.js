import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
   customers: [],
 };

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addNewCustomer: (state, action) => {
      if (state.customers) {
        const existingCustomer = state.customers.find(customer => customer.id === action.payload.id);
        if(existingCustomer){
          return;
        }
        else {
        state.customers.push(action.payload);
        console.log(`addNewCustomer action.payload: `, action.payload);
        };
      };
    },
  
    editCustomer: (state, action) => {
      if (state.customers) {
      const { id, custid, firstname, lastname, email, cell, addr1, addr2, city, st, zip, usertype } = action.payload;
      const existingCustomer = state.customers.find(customer => customer.id === id);
      
        if(existingCustomer) {
          if (custid) existingCustomer.custid = custid;
          if (firstname) existingCustomer.firstname = firstname;
          if (lastname) existingCustomer.lastname = lastname;
          if (email) existingCustomer.email = email;
          if (cell) existingCustomer.cell = cell;
          if (addr1) existingCustomer.addr1 = addr1;
          if (addr2) existingCustomer.addr2 = addr2;
          if (city) existingCustomer.city = city;
          if (st) existingCustomer.st = st;
          if (zip) existingCustomer.zip = zip;
          if (usertype) existingCustomer.usertype = usertype;
        }
      }
    },

    removeCustomer: (state, action) => {
      if(state.customers) {
        state.customers.splice(state.customers.findIndex((customer) => customer.id === action.payload), 1);
      }
    },

    resetCustomers: (state, action) => {
      return initialState;
    }
  },
});

export const { addNewCustomer, editCustomer, removeCustomer, resetCustomers } = customersSlice.actions;

export default customersSlice.reducer;

export const selectCustomers = state => state.customers;

export const selectCustomerByCustid = (state, custid) => state.customers.customers.find((customer) => customer.custid = custid);

export const selectCustomersCount = state => state.customers.length;
