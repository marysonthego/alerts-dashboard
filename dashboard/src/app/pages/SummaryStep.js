import React from 'react';
import { makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

export const SummaryStep = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      {/* begin::Head */}
      <Box className={classes.head}>
        <div className="text-center mb-10 ">
          <p className="text-muted font-weight-bold">
            Review your choices. You can make changes right here!
          </p>
        </div>
      </Box>
    </Box>
  );
};
