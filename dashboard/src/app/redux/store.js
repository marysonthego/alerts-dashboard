import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'app/redux/userSlice';
import customersReducer from 'app/redux/customersSlice';
import locationsReducer from 'app/redux/locationsSlice';
import friendsReducer from 'app/redux/friendsSlice';
import errorsReducer from 'app/redux/errorsSlice';
import stepperReducer from 'app/redux/stepperSlice';
import { apiSlice } from 'app/redux/apiSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    locations: locationsReducer,
    friends: friendsReducer,
    errors: errorsReducer,
    stepper: stepperReducer,
    customers: customersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})
