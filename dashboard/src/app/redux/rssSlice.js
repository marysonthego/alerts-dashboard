import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = { 
  rssfeeds: [{
    id: 0,
    rssName: "", 
    rssUrl: "",
   }],
 };

export const rssfeedsSlice = createSlice({
  name: 'rssfeeds',
  initialState,
  reducers: {

    addRssfeed: {
      reducer (state, action) {
      state.rssfeeds.push(action.payload);
      },
      prepare(rssName, rssUrl) {
        return {
          payload: {
            id: nanoid(),
            rssName,
            rssUrl
          }
        }
      }
    },
  
    updateRssfeed: (state, action) => {
      if (state.rssfeeds) {
        const {id, rssName, rssUrl} = action.payload;
        const existingRssfeed = state.rssfeeds.find(rssfeed => rssfeed.id === id);
        if (existingRssfeed) {
          if(rssName) existingRssfeed.rssName = rssName;
          if(rssUrl) existingRssfeed.rssUrl = rssUrl;
        }
      }
    },

    removeRssfeed: (state, action) => {
      if(state.rssfeeds) {
        state.rssfeeds.splice(state.rssfeeds.findIndex((rssfeed) => rssfeed.id === action.payload), 1);
      }
    },

    resetRssfeeds: (state, action) => {
      return initialState;
    },
}
});

export const { addRssfeed, updateRssfeed, removeRssfeed, resetRssfeeds } = rssfeedsSlice.actions;

export default rssfeedsSlice.reducer;

export const selectRssfeeds = state => state.rssfeeds;

export const selectRssfeed = (state, rssfeedId) => 
    state.rssfeeds.rssfeeds.find((rssfeed) => rssfeed.id === rssfeedId);
