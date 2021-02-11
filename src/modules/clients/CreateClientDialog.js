import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import { format as fnsFormat } from "date-fns";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
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
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const childRef = useRef();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // setOpen(false);
        childRef.current.saveNewClient().then((res) => {
            console.log("¡Sí! " + res);
        }).catch((err) => {
            console.log("no! " + err);
        });
    };

    const getCreateUserForm = (form) => {
        console.log('start getCreateUserForm');
        console.log(form);
    };



    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Crear Cliente
      </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Crear Cliente
            </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Guardar
            </Button>
                    </Toolbar>
                </AppBar>


                <CreateClientForm ref={childRef} getCreateUserForm={getCreateUserForm} />



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
    const [selectedDate, setSelectedDate] = React.useState(new Date('1990-08-18T21:11:54'));

    const [clientState, setClientState] = React.useState({
        "cui": "",
        "name1": "",
        "name2": "",
        "last_name1": "",
        "last_name2": "",
        "birth_date": "",
        "phone": "",
        "email": "",
        "country": "",
        "departament": "",
        "municipality": "",
        "street": "",
        "reference": "",
        "zip_code": ""
    });


    useImperativeHandle(
        ref,
        () => ({
            saveNewClient() {
                return new Promise(function (resolve, reject) {
                    console.log('el client es:', clientState);

                    if (clientState.name1 && clientState.last_name1) {
                        resolve( 'Correcto' );
                    } else {
                        reject('Necesita al menos el primer nombre y el primer apellido');
                    }
                });
            }
        }),
    )

    const handleDateChange = (date) => {
        setSelectedDate(date);
        let client = clientState;
        client.birth_date = fnsFormat(date, 'yyyy/MM/dd');
        setClientState(client);
        console.log(clientState);
    };

    const handleInputChange = (e) => {
        let client = clientState;
        client[e.target.id] = e.target.value;
        setClientState(client);
        console.log(clientState);
    };



    useEffect(() => {
        //se ejecuta al crear el componente
        // console.log('CreateClientForm');
        // props.getCreateUserForm('hola que hace');
        // console.log(props);
    }, []);

    return (
        <form className={classes.root} noValidate autoComplete="off" >

            <div className={classes.rootGrid}>
                <Grid container spacing={3}>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="cui" label="DPI" variant="outlined" fullWidth={true} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="name1" label="Primer Nombre" variant="outlined" fullWidth={true} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="name2" label="Segundo Nombre" variant="outlined" fullWidth={true} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="last_name1" label="Primer Apellido" variant="outlined" fullWidth={true} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="last_name2" label="Segundo Apellido" variant="outlined" fullWidth={true} onChange={handleInputChange} />
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
                        <TextField id="phone" label="Teléfono" variant="outlined" fullWidth={true} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="email" label="Correo @" variant="outlined" fullWidth={true} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="country" label="País" variant="outlined" fullWidth={true} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="departament" label="Departamento" variant="outlined" fullWidth={true} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="municipality" label="Municipio" variant="outlined" fullWidth={true} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="street" label="Calle" variant="outlined" fullWidth={true} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="reference" label="Referencia" variant="outlined" fullWidth={true} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="zip_code" label="Código postal" variant="outlined" fullWidth={true} onChange={handleInputChange} />
                    </Grid>

                </Grid>
            </div>

        </form>
    );
})