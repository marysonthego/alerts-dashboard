import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
   locations: [],
 };

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {

    addNewLocation: (state, action) => {
      if (state.locations) {
        const existingLocation = state.locations.find(location => location.id === action.payload.id);
        if(existingLocation){
          return;
        }
        else {
        state.locations.push(action.payload);
        console.log(`addNewLocation action.payload: `, action.payload);
        };
      };
    },
  
    editLocation: (state, action) => {
      if (state.locations) {
      const { id, custid, cell, city, st, zip, nickname, weatheralert, virusalert, airalert } = action.payload;
      const existingLocation = state.locations.find(location => location.id === id);
      
        if(existingLocation) {
          if (custid) existingLocation.custid = custid;
          if (cell) existingLocation.cell = cell;
          if (city) existingLocation.city = city;
          if (st) existingLocation.st = st;
          if (zip) existingLocation.zip = zip;
          if (nickname) existingLocation.nickname = nickname;
          if (weatheralert) existingLocation.weatheralert = weatheralert;
          if (virusalert) existingLocation.virusalert = virusalert;
          if (airalert) existingLocation.airalert = airalert;
        }
      }
    },

    removeLocation: (state, action) => {
      if(state.locations) {
        state.locations.splice(state.locations.findIndex((location) => location.id === action.payload), 1);
      }
    },

    // resetLocations: (state, action) => {
    //   if(state.locations.length > 0) {
    //     state.locations.forEach(id => {
    //       return initLocation;
    //     });
    //   };
    // },

    resetLocations: (state, action) => {
      return initialState;
    }
  },
});

// Action creators are generated for each case reducer function
export const { addNewLocation, editLocation, removeLocation, resetLocations } = locationsSlice.actions;

export default locationsSlice.reducer;

export const selectLocations = state => state.locations;

export const selectLocationsByCustid = (state, custid) => state.locations.locations.find((location) => location.custid = custid);

export const selectLocationById = (state, locationId) => 
    state.locations.locations.find((location) => location.id === locationId);

    // use anonymous function to select in UI
    // let location = useSelector(state => selectLocationById(state, id));

export const selectLocationsCount = state => state.locations.length;
