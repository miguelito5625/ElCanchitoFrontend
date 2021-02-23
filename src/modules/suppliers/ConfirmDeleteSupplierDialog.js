import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSuppliersContext } from '../../context/SuppliersContext';
import { Slide } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDeleteSupplierDialog() {
  const {openDeleteSupplierDialog, setOpenDeleteSupplierDialog, selectedSupplier, switchStateSupplier} = useSuppliersContext();

  const handleClose = () => {
    setOpenDeleteSupplierDialog(false);
  };

  const handleDeleteSupplier = () => {
    switchStateSupplier();
    setOpenDeleteSupplierDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openDeleteSupplierDialog}
        TransitionComponent={Transition}
        transitionDuration={{enter:500, exit:500}}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Desea eliminar al proveedor {selectedSupplier?selectedSupplier.name1:''} {selectedSupplier?selectedSupplier.last_name1:''}?</DialogTitle>
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
          <Button onClick={handleDeleteSupplier} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
