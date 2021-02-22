import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useClientsContext } from '../../context/ClientsContext';
import { Slide } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDeleteClientDialog() {
  const {openDeleteClientDialog, setOpenDeleteClientDialog, selectedClient, switchStateClient} = useClientsContext();

  const handleClose = () => {
    setOpenDeleteClientDialog(false);
  };

  const handleDeleteClient = () => {
    switchStateClient();
    setOpenDeleteClientDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openDeleteClientDialog}
        TransitionComponent={Transition}
        transitionDuration={{enter:500, exit:500}}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Desea eliminar al cliente {selectedClient?selectedClient.name1:''} {selectedClient?selectedClient.last_name1:''}?</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteClient} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
