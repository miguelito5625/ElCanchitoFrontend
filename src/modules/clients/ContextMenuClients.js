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
  const {openContextMenuClients, setOpenContextMenuClients} = useAppContext();
  const { editClient } = useClientsContext();

  const handleClose = () => {
    setOpenContextMenuClients(initialState);
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
        <MenuItem onClick={editClient}>Modificar</MenuItem>
        <MenuItem onClick={handleClose}>Borrar</MenuItem>
      </Menu>
    </div>
  );
}
