import React, { useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from '../../context/AppContext';

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
  const {openSnackbars, setSnackbar} = useContext(AppContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    // setOpen(false);
    setSnackbar(false);
  };

  return (
    <div className={classes.root}>

      <Snackbar open={openSnackbars} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          This is a success message!
        </Alert>
      </Snackbar>
     
    </div>
  );
}
