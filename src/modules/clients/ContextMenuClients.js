import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { useAppContext } from '../../context/AppContext';
import { useClientsContext } from '../../context/ClientsContext';

const initialState = {
  mouseX: null,
  mouseY: null,
};

export default function ContextMenuClients() {
  const {openContextMenuClients, setOpenContextMenuClients } = useAppContext();
  const { editClient, showDetailsClient, switchStateClient, setOpenDeleteClientDialog } = useClientsContext();

  const handleClose = () => {
    setOpenContextMenuClients(initialState);
  };

  const handleConfirmDelete = () => {
    setOpenContextMenuClients(initialState);
    setOpenDeleteClientDialog(true);
  };

  return (
    <div style={{ cursor: 'context-menu' }}>
      <Menu
        keepMounted
        open={openContextMenuClients.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          openContextMenuClients.mouseY !== null && openContextMenuClients.mouseX !== null
            ? { top: openContextMenuClients.mouseY, left: openContextMenuClients.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={showDetailsClient}>Ver datos</MenuItem>
        <MenuItem onClick={editClient}>Modificar</MenuItem>
        <MenuItem onClick={handleConfirmDelete}>Eliminar</MenuItem>
      </Menu>
    </div>
  );
}
