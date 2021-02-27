import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Home as HomeIcon, Person as PersonIcon } from '@material-ui/icons';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';



export default class DrawerItems extends Component {



    render() {
        return (

            <>
            
                <ListItem button key={'Dashboard'} component={Link} to={'/'} >
                    <ListItemIcon> <HomeIcon /> </ListItemIcon>
                    <ListItemText primary={'Dashboard'} />
                </ListItem>

                <ListItem button key={'Clientes'} component={Link} to={'/clients'}>
                    <ListItemIcon> <PersonIcon /> </ListItemIcon>
                    <ListItemText primary={'Clientes'} />
                </ListItem>

                <ListItem button key={'Proveedores'} component={Link} to={'/suppliers'}>
                    <ListItemIcon> <PersonIcon /> </ListItemIcon>
                    <ListItemText primary={'Proveedores'} />
                </ListItem>

                <ListItem button key={'Productos'} component={Link} to={'/products'}>
                    <ListItemIcon> <PersonIcon /> </ListItemIcon>
                    <ListItemText primary={'Productos'} />
                </ListItem>

            </>

        )
    }
}
