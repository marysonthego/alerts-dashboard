import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeStep: 0,
  isValid: true,
  backEnabled: false,
  nextEnabled: true,
  status: 'idle',
  error: null,
};

export const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    updateActiveStep: (state, action) => {
      state.activeStep = action.payload;
      if(state.activeStep < 0)
        state.activeStep = 0;
    },
    updateIsValid: (state, action) => {
      state.isValid = action.payload;
    },
    updateBackEnabled: (state, action) => {
      state.backEnabled = action.payload;
    },
    updateNextEnabled: (state, action) => {
      state.nextEnabled = action.payload;
    },
  },
});

// Action creators are generated for each reducer function
export const { updateActiveStep, updateIsValid, updateBackEnabled, updateNextEnabled } = stepperSlice.actions;

export default stepperSlice.reducer;

export const selectActiveStep = state => state.stepper.activeStep;
export const selectIsValid = state => state.stepper.isValid;
export const selectBackEnabled = state => state.stepper.backEnabled;
export const selectNextEnabled = state => state.stepper.nextEnabled;
