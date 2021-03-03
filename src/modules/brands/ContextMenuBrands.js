import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useBrandsContext } from '../../context/BrandsContext';

const initialState = {
  mouseX: null,
  mouseY: null,
};

export default function ContextMenuBrands() {

  const { editBrand, showDetailsBrand, setOpenDeleteBrandDialog, openContextMenuBrands, setOpenContextMenuBrands } = useBrandsContext();

  const handleClose = () => {
    setOpenContextMenuBrands(initialState);
  };

  const handleConfirmDelete = () => {
    setOpenContextMenuBrands(initialState);
    setOpenDeleteBrandDialog(true);
  };

  return (
    <div style={{ cursor: 'context-menu' }}>
      <Menu
        keepMounted
        open={openContextMenuBrands.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          openContextMenuBrands.mouseY !== null && openContextMenuBrands.mouseX !== null
            ? { top: openContextMenuBrands.mouseY, left: openContextMenuBrands.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={showDetailsBrand}>Ver datos</MenuItem>
        <MenuItem onClick={editBrand}>Modificar</MenuItem>
        <MenuItem onClick={handleConfirmDelete}>Eliminar</MenuItem>
      </Menu>
    </div>
  );
}
