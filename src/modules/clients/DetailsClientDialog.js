import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import { useClientsContext } from "../../context/ClientsContext";
import { useAppContext } from '../../context/AppContext';
import * as moment from 'moment';


const useStylesDetailsClientDialog = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailsClientDialog() {
    const classes = useStylesDetailsClientDialog();
    const { openDetailsClientDialog, setOpenDetailsClientDialog } = useAppContext();
    const { clearSelectedClient } = useClientsContext();




    const handleClose = () => {
        setOpenDetailsClientDialog(false);
        clearSelectedClient();
    };


    return (
        <div>

            <Dialog
                fullScreen
                open={openDetailsClientDialog}
                onClose={handleClose}
                TransitionComponent={Transition}
            >

                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Detalles
                         </Typography>

                    </Toolbar>
                </AppBar>


                <DetailsClientForm />

            </Dialog>
        </div>
    );
}


const useStylesForm = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: '10px',
            paddingLeft: '10px',
            paddingRight: '10px',
            width: '100%',
        },
        rootGrid: {
            flexGrow: 1,
        },
    },
}));

const DetailsClientForm = forwardRef((props, ref) => {
    const classes = useStylesForm();
    const { clientInForm, selectedDate } = useClientsContext();


    return (
        <form className={classes.root} noValidate autoComplete="off">


            <div className={classes.rootGrid}>
                <Grid container spacing={3}>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField
                            id="cui"
                            label="DPI"
                            variant="outlined"
                            fullWidth={true}
                            defaultValue={clientInForm.cui}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField 
                        id="name1" 
                        label="Primer Nombre" 
                        variant="outlined" 
                        fullWidth={true} 
                        defaultValue={clientInForm.name1} 
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField 
                        id="name2" 
                        label="Segundo Nombre" 
                        variant="outlined" 
                        fullWidth={true} 
                        defaultValue={clientInForm.name2} 
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField 
                        id="last_name1" 
                        label="Primer Apellido" 
                        variant="outlined" 
                        fullWidth={true} 
                        defaultValue={clientInForm.last_name1}
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField 
                        id="last_name2" 
                        label="Segundo Apellido" 
                        variant="outlined" 
                        fullWidth={true} 
                        defaultValue={clientInForm.last_name2} 
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField 
                        id="birth_date" 
                        label="Fecha de nacimiento" 
                        variant="outlined" 
                        fullWidth={true} 
                        defaultValue={moment(selectedDate, 'YYYY-MM-DD').isValid()?moment(selectedDate, 'YYYY-MM-DD').format('DD/MM/YYYY'):''} 
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField 
                        id="phone" 
                        label="Teléfono" 
                        variant="outlined" 
                        fullWidth={true} 
                        defaultValue={clientInForm.phone} 
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField 
                        id="email" 
                        label="Correo @" 
                        variant="outlined" 
                        fullWidth={true} 
                        defaultValue={clientInForm.email} 
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField 
                        id="country" 
                        label="País" 
                        variant="outlined" 
                        fullWidth={true} 
                        defaultValue={clientInForm.country} 
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField 
                        id="departament" 
                        label="Departamento" 
                        variant="outlined" 
                        fullWidth={true} 
                        defaultValue={clientInForm.departament} 
                        />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField 
                        id="municipality" 
                        label="Municipio" 
                        variant="outlined" 
                        fullWidth={true} 
                        defaultValue={clientInForm.municipality} 
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField 
                        id="street" 
                        label="Calle" 
                        variant="outlined" 
                        fullWidth={true} 
                        defaultValue={clientInForm.street} 
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField 
                        id="reference" 
                        label="Referencia" 
                        variant="outlined" 
                        fullWidth={true} 
                        defaultValue={clientInForm.reference} 
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField 
                        id="zip_code" 
                        label="Código postal" 
                        variant="outlined" 
                        fullWidth={true} 
                        defaultValue={clientInForm.zip_code} 
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>

                    </Grid>


                </Grid>
            </div>

        </form>
    );
})