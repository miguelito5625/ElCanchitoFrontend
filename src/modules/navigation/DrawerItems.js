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




                {/* <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List> */}

                {/* <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List> */}

            </>

        )
    }
}
