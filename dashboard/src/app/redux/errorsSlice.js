import { createSlice, nanoid } from '@reduxjs/toolkit';
import { initAllErrors } from 'app/helpers/Initializers';

const data = {...initAllErrors};

const initialState = {
  errors: {...data},
  status: 'idle',
};

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    addErrorState: (state, action) => {
      state.errors = action.payload;
    },
      prepare() {
        return {
          payload: {
            id: nanoid(),
          }
        };
      },
    updateErrorState: (state, action) => {
      state.errors = {...state.errors, ...action.payload};
    },
    deleteErrorState: (state, action) => {
      state.errors = {...state.errors, data};
    },
    addLocationsErrorsState: (state, action) => {
      state.errors.locations = action.payload;
    }
  },
});

// Action creators are generated for each reducer function
export const { addErrorState, updateErrorState, deleteErrorState } = errorsSlice.actions;

export default errorsSlice.reducer;

export const selectAllErrorsState = state => state.errors;
export const selectAllLocationsErrors = state => state.errors.locations;
export const selectAllFriendsErrors = state => state.errors.friends;
