import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'app/redux/userSlice';
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
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})
