import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = { 
  rssitems: [{
    id: 0,
    rssid: 0,
    link: "", 
    title: "",
    description: "",
   }],
 };

export const rssitemsSlice = createSlice({
  name: 'rssitems',
  initialState,
  reducers: {

    addRssitem: {
      reducer (state, action) {
      state.rssitems.push(action.payload);
      },
      prepare(rssid, link, title, description) {
        return {
          payload: {
            id: nanoid(),
            rssid,
            link,
            title,
            description
          }
        }
      }
    },
  
    updateRssfeed: (state, action) => {
      if (state.rssitems) {
        const {id, rssid, link, title, description} = action.payload;
        const existingRssitem = state.rssitems.find(rssitem => rssitem.id === id);
        if (existingRssitem) {
          if(link) existingRssitem.link = link;
          if(title) existingRssitem.title = title;
          if(description) existingRssitem.description = description;
        }
      }
    },

    removeRssfeed: (state, action) => {
      if(state.rssitems) {
        state.rssitems.splice(state.rssitems.findIndex((rssitem) => rssitem.id === action.payload), 1);
      }
    },

    resetRssfeeds: (state, action) => {
      return initialState;
    },
}
});

export const { addRssitem, updateRssitem, removeRssitem, resetRssitems } = rssitemsSlice.actions;

export default rssitemsSlice.reducer;

export const selectRssitems = state => state.rssitems;

export const selectRssitem = (state, id) => 
    state.rssitems.rssitems.find((rssitem) => rssitem.id === id);
