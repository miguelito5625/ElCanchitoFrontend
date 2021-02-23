import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useSuppliersContext } from '../../context/SuppliersContext';

const initialState = {
  mouseX: null,
  mouseY: null,
};

export default function ContextMenuSuppliers() {

  const { editSupplier, showDetailsSupplier, setOpenDeleteSupplierDialog, openContextMenuSuppliers, setOpenContextMenuSuppliers } = useSuppliersContext();

  const handleClose = () => {
    setOpenContextMenuSuppliers(initialState);
  };

  const handleConfirmDelete = () => {
    setOpenContextMenuSuppliers(initialState);
    setOpenDeleteSupplierDialog(true);
  };

  return (
    <div style={{ cursor: 'context-menu' }}>
      <Menu
        keepMounted
        open={openContextMenuSuppliers.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          openContextMenuSuppliers.mouseY !== null && openContextMenuSuppliers.mouseX !== null
            ? { top: openContextMenuSuppliers.mouseY, left: openContextMenuSuppliers.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={showDetailsSupplier}>Ver datos</MenuItem>
        <MenuItem onClick={editSupplier}>Modificar</MenuItem>
        <MenuItem onClick={handleConfirmDelete}>Eliminar</MenuItem>
      </Menu>
    </div>
  );
}
