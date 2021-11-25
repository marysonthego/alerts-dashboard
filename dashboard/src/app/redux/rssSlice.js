import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
   rssState: [],
 };

export const rssSlice = createSlice({
  name: 'rssState',
  initialState,
  reducers: {
  
    updateRssState: (state, action) => {
      const {rssName, rssUrl, item} = action.payload;
      const existingRss = state.rssState;
      if (existingRss) {
        if(rssName) existingRss.rssName = rssName;
        if(rssUrl) existingRss.rssUrl = rssUrl;
        if(item) existingRss.item = item;
      }
    },

    resetRssState: (state, action) => {
      return initialState;
    },
}
});

export const { updateRssState, resetRssState } = rssSlice.actions;

export default rssSlice.reducer;

export const selectRss = state => state.rssState;
