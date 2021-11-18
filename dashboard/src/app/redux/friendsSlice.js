import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
   friends: [],
 };

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {

    addNewFriend: (state, action) => {
      if (state.friends) {
        //const { id, custid, firstname, cell, city, st, zip, weatheralert, virusalert, airalert } = action.payload;
        const existingFriend = state.friends.find(friend => friend.id === action.payload.id);
        if(existingFriend){
          return;
        }
        else {
        state.friends.push(action.payload);
        console.log(`addNewFriend action.payload: `, action.payload);
        };
      };
    },
  
    editFriend: (state, action) => {
      if (state.friends) {
      const { id, custid, firstname, cell, city, st, zip, weatheralert, virusalert, airalert } = action.payload;
      const existingFriend = state.friends.find(friend => friend.id === id);
      
        if(existingFriend) {
          if (custid) existingFriend.custid = custid;
          if (firstname) existingFriend.firstname = firstname;
          if (cell) existingFriend.cell = cell;
          if (city) existingFriend.city = city;
          if (st) existingFriend.st = st;
          if (zip) existingFriend.zip = zip;
          if (weatheralert) existingFriend.weatheralert = weatheralert;
          if (virusalert) existingFriend.virusalert = virusalert;
          if (airalert) existingFriend.airalert = airalert;
        }
      }
    },

    removeFriend: (state, action) => {
      if(state.friends) {
        state.friends.splice(state.friends.findIndex((friend) => friend.id === action.payload), 1);
      }
    },

    // resetFriends: (state, action) => {
    //   if(state.friends.length > 0) {
    //     state.friends.forEach(id => {
    //       return initFriend;
    //     });
    //   };
    // },

    resetFriends: (state, action) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNewFriend, editFriend, removeFriend, resetFriends } = friendsSlice.actions;

export default friendsSlice.reducer;

export const selectFriends = state => state.friends;

export const selectFriendsByCustid = (state, custid) => state.friends.friends.find((friend) => friend.custid = custid);

export const selectFriendById = (state, friendId) => 
    state.friends.friends.find((friend) => friend.id === friendId);

    // use anonymous function to select in UI:
    // let friend = useSelector(state => selectFriendById(state, id));

export const selectFriendsCount = state => state.friends.length;
