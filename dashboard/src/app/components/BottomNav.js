import React from 'react';
import {Link} from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';

const useStyles = makeStyles(theme => ({
  bottomNav: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'nowrap',
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    right: '0px',
    width: '100%',
    height: '60px',
  },
  navButtons: {
    marginBottom: '5em',
  },
  stickToBottom: {
    position: 'fixed',
    bottom: 0,
  },
}));

export const BottomNav = () => {
  const classes = useStyles();

  return (
  <div className={classes.bottomNav}>
    <BottomNavigation className={classes.stickToBottom} showLabels>
      <BottomNavigationAction
        value="copy"
        label="2021 Alerts for Good"
        icon={<CopyrightIcon />}
        to="./"
        component={Link}
      />
      <BottomNavigationAction
        value="info"
        label="Privacy"
        to="./"
        component={Link}
      />
      <BottomNavigationAction
        value="contact"
        label="Contact"
        to="./"
        component={Link}
      />
      <BottomNavigationAction
        value="donation"
        label="Donate"
        to="./"
        component={Link}
      />
    </BottomNavigation>
  </div>
  );
};
