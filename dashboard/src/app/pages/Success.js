import React from "react";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(3),
    color: "#000000",
  },
  title: {
    marginTop: 30,
  }
}));

export const Success = () => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Typography variant="h2" align="center" >
        Thank you!
      </Typography>
      <Typography component="p" align="center" className={classes.title}>
        
      </Typography>
    </Box>
  );
};

