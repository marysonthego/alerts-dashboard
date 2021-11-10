import React from 'react';
import { ListFriends } from 'app/pages/ListFriends';
import { AddFriendForm } from 'app/pages/AddFriendForm';
import { Box } from '@material-ui/core';

export const FriendsStep = () => {

  const FriendsHeader = () => {
    return (
      <div key="div01" className={ `card card-custom` }>
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">
              Friends & Family List
            </span>
            <span className="text-muted mt-3 font-weight-bold font-size-sm">
              You can add people to the list here. When you add people they'll get a text message invitation to start receiving text alerts for the city you provide. All they have to do is reply 'yes' to accept! (great for anyone uncomfortable with technology)
            </span>
          </h3>
        </div>
      </div>
    );
  };
  return (
    <Box>
      <div>
        <FriendsHeader />
        <AddFriendForm />
        <ListFriends />
      </div>
    </Box>
  );
};
