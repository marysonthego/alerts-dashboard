import React from 'react';
import {useHistory} from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import {Paper} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import {Card} from '@material-ui/core';
import {CardActions} from '@material-ui/core';
import {Button} from '@material-ui/core';
import {IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import InputIcon from '@material-ui/icons/Input';
import LockOpenIcon from '@material-ui/icons/LockOpen';

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
    const history = useHistory();

    const handleDismiss = () => {
        closeSnackbar(props.id);
    };

    const handleLogin = () => {
      history.push({
        pathname: '/auth/login', 
      });
    }

    if(message === 'signUpError') {
    return (
        <Card className={classes.card}>
            <CardActions classes={{ root: classes.actionRoot }}>
                <Typography variant="subtitle2" className={classes.typography}>The email address and cell phone combination you entered is already in use.</Typography>
                <div className={classes.icons}>
                    <IconButton className={classes.expand} onClick={handleDismiss}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </CardActions>
                <Paper className={classes.expand}>
                    <Typography gutterBottom>You can login or continue signing up to make changes. </Typography>
                    <p>
                    <Button size="medium" className={classes.button}>
                        <LockOpenIcon className={classes.checkIcon}
                        onClick={handleLogin}/>
                        Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Button>
                    </p>
                    <p>
                    <Button size="medium" className={classes.button}>
                        <InputIcon className={classes.checkIcon} 
                        onClick={handleDismiss}/>
                        Continue
                    </Button>
                    </p>
                </Paper>
        </Card>
      );
    } else {
      return null;
    }

};

export default withStyles(styles)(Snackbar);

