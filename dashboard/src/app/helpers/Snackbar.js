import React from 'react';
import { withStyles } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Typography } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  card: {
    maxWidth: 400,
    minWidth: 344,
  },
  typography: {
    fontWeight: 'bold',
  },
  actionRoot: {
    padding: '8px 8px 8px 16px',
    backgroundColor: '#fddc6c',
  },
  icons: {
    marginLeft: '8px',
  },
  expand: {
    padding: '8px 8px',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  collapse: {
    padding: 16,
  },
  checkIcon: {
    fontSize: 20,
    color: '#b3b3b3',
    paddingRight: 4,
    paddingLeft: 4,
  },
  button: {
    padding: 0,
    textTransform: 'none',
  },
});

const Snackbar = (props) => {
  const { classes } = props;
  const message = props.message;
  const { closeSnackbar } = useSnackbar();
  let displayedMsg = '';

  const handleDismiss = () => {
    closeSnackbar(props.id);
  };

  if (message === 'signUpError') {
    displayedMsg = "The email address and cell phone combination you entered is already in use."
  } else if (message === '500ServerError') {
    displayedMsg = "Server Error. Please try again later."
  } else if (message === 'missingRequiredField') {
    displayedMsg = "Please complete required fields"
  } else {
    return null;
  }
  
  return (
    <Card className={ classes.card }>
      <CardActions classes={ { root: classes.actionRoot } }>
        <Typography variant="subtitle2" className={ classes.typography }>{ displayedMsg }</Typography>
        <div className={ classes.icons }>
          <IconButton className={ classes.expand } onClick={ handleDismiss }>
            <CloseIcon />
          </IconButton>
        </div>
      </CardActions>
      {/* <Paper className={ classes.expand }>
        <Typography gutterBottom>You can login or continue to make changes. </Typography>
        <p>
          <Button size="medium" className={ classes.button }>
            <LockOpenIcon className={ classes.checkIcon }
              onClick={ handleLogin } />
            Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Button>
        </p>
        <p>
          <Button size="medium" className={ classes.button }>
            <InputIcon className={ classes.checkIcon }
              onClick={ handleDismiss } />
            Continue
          </Button>
        </p>
      </Paper> */}
    </Card>
  )
};

export default withStyles(styles)(Snackbar);

