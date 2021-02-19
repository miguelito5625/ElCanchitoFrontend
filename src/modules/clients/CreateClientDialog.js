import React, { useEffect, useRef, useImperativeHandle, forwardRef, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import { format as fnsFormat } from "date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { useClientsContext } from "../../context/ClientsContext";
import { useSnackbar } from 'notistack';
import { useAppContext } from '../../context/AppContext';


const useStylesCreateClientDialog = makeStyles((theme) => ({
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

export default function CreateClientDialog() {
    const classes = useStylesCreateClientDialog();
    const { openCreateClientDialog, setOpenCreateClientDialog } = useAppContext();
    const { saveNewClient } = useClientsContext();


    const handleClickOpen = () => {
        setOpenCreateClientDialog(true);
    };

    const handleClose = () => {
        setOpenCreateClientDialog(false);
    };


    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Crear Cliente
      </Button>
            <Dialog
                fullScreen
                open={openCreateClientDialog}
                onClose={handleClose}
                TransitionComponent={Transition}
            >

                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Crear Cliente
                         </Typography>

                        <Button autoFocus color="inherit" onClick={saveNewClient}>
                            Guardar
                        </Button>

                    </Toolbar>
                </AppBar>


                <CreateClientForm />

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
            // padding: '20px'
        },
        rootGrid: {
            flexGrow: 1,
        },
    },
}));

// function CreateClientForm(props, ref) {
const CreateClientForm = forwardRef((props, ref) => {
    const classes = useStylesForm();
    const { clientInForm, setClientInForm, selectedDate, setSelectedDate, saveNewClient } = useClientsContext();

    const submitForm = (event) => {
        event.preventDefault();
        saveNewClient();
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        let client = clientInForm;
        client.birth_date = fnsFormat(date, 'yyyy-MM-dd');
        setClientInForm(client);
        console.log(clientInForm);
    };

    const handleInputChange = (e) => {
        let client = clientInForm;
        client[e.target.id] = e.target.value;
        setClientInForm(client);
        console.log(clientInForm);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={submitForm}>


            <div className={classes.rootGrid}>
                <Grid container spacing={3}>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="cui" label="DPI" variant="outlined" fullWidth={true} defaultValue={clientInForm.cui} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="name1" label="Primer Nombre" variant="outlined" fullWidth={true} defaultValue={clientInForm.name1} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="name2" label="Segundo Nombre" variant="outlined" fullWidth={true} defaultValue={clientInForm.name2} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="last_name1" label="Primer Apellido" variant="outlined" fullWidth={true} defaultValue={clientInForm.last_name1} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="last_name2" label="Segundo Apellido" variant="outlined" fullWidth={true} defaultValue={clientInForm.last_name2} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>

                            <KeyboardDatePicker
                                fullWidth={true}
                                id="date-picker-dialog"
                                label="Fecha de nacimiento"
                                format="dd/MM/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="phone" label="Teléfono" variant="outlined" fullWidth={true} defaultValue={clientInForm.phone} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="email" label="Correo @" variant="outlined" fullWidth={true} defaultValue={clientInForm.email} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="country" label="País" variant="outlined" fullWidth={true} defaultValue={clientInForm.country} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="departament" label="Departamento" variant="outlined" fullWidth={true} defaultValue={clientInForm.departament} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="municipality" label="Municipio" variant="outlined" fullWidth={true} defaultValue={clientInForm.municipality} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="street" label="Calle" variant="outlined" fullWidth={true} defaultValue={clientInForm.street} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="reference" label="Referencia" variant="outlined" fullWidth={true} defaultValue={clientInForm.reference} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="zip_code" label="Código postal" variant="outlined" fullWidth={true} defaultValue={clientInForm.zip_code} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>


                        <Button variant="contained" startIcon={<SaveIcon />} size="large" color="primary" type="button" fullWidth={true} onClick={saveNewClient}>
                            Guardar
                        </Button>

                    </Grid>


                </Grid>
            </div>

        </form>
    );
})