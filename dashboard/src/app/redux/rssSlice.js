import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  rssfeed: [{
    rssName: "", 
    rssUrl: "",
    item: "",
   }],
 };

export const rssSlice = createSlice({
  name: 'rssfeed',
  initialState,
  reducers: {
  
    updateRssState: (state, action) => {
      const {rssName, rssUrl, item} = action.payload;
      const existingRss = state.rssfeed;
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

export const selectRss = state => state.rssfeed;
