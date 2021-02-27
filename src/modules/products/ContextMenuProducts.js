import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useProductsContext } from '../../context/ProductsContext';

const initialState = {
  mouseX: null,
  mouseY: null,
};

export default function ContextMenuProducts() {

  const { editProduct, showDetailsProduct, setOpenDeleteProductDialog, openContextMenuProducts, setOpenContextMenuProducts } = useProductsContext();

  const handleClose = () => {
    setOpenContextMenuProducts(initialState);
  };

  const handleConfirmDelete = () => {
    setOpenContextMenuProducts(initialState);
    setOpenDeleteProductDialog(true);
  };

  return (
    <div style={{ cursor: 'context-menu' }}>
      <Menu
        keepMounted
        open={openContextMenuProducts.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          openContextMenuProducts.mouseY !== null && openContextMenuProducts.mouseX !== null
            ? { top: openContextMenuProducts.mouseY, left: openContextMenuProducts.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={showDetailsProduct}>Ver datos</MenuItem>
        <MenuItem onClick={editProduct}>Modificar</MenuItem>
        <MenuItem onClick={handleConfirmDelete}>Eliminar</MenuItem>
      </Menu>
    </div>
  );
}
