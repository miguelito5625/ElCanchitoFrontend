import React, { useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useNotificationContext } from "../../context/NotificationContext";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ElCanchitoSnackbars(props) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  const { openSnackbar, setOpenSnackbar, durationSnackbar, messageSnackbar, severitySnackbar } = useNotificationContext();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    // setOpen(false);
    setOpenSnackbar(false);
  };

  return (
    <div className={classes.root}>

      <Snackbar open={openSnackbar} autoHideDuration={durationSnackbar} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severitySnackbar}>
          {messageSnackbar}
        </Alert>
      </Snackbar>
     
    </div>
  );
}
