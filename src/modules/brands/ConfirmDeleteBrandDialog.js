import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useBrandsContext } from '../../context/BrandsContext';
import { Slide } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDeleteBrandDialog() {
  const {openDeleteBrandDialog, setOpenDeleteBrandDialog, selectedBrand, switchStateBrand} = useBrandsContext();

  const handleClose = () => {
    setOpenDeleteBrandDialog(false);
  };

  const handleDeleteBrand = () => {
    switchStateBrand();
    setOpenDeleteBrandDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openDeleteBrandDialog}
        TransitionComponent={Transition}
        transitionDuration={{enter:500, exit:500}}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Desea eliminar la marca {selectedBrand?selectedBrand.name:''}?</DialogTitle>
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
          <Button onClick={handleDeleteBrand} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
