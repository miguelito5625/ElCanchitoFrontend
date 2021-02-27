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
import { useProductsContext } from "../../context/ProductsContext";
import { useAppContext } from '../../context/AppContext';


const useStylesCreateProductDialog = makeStyles((theme) => ({
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

export default function CreateProductDialog() {
    const classes = useStylesCreateProductDialog();

    const { 
        saveOrUpdateProducte, 
        clearSelectedProduct, 
        setSelectedDate, 
        openProductCreateDialog, 
        setOpenProductCreateDialog, 
        titleProductCreateDialog, 
        setTitleProductCreateDialog 
    } = useProductsContext();


    const handleClickOpen = () => {
        setSelectedDate(null);
        setTitleProductCreateDialog('Crear Proveedor');
        clearSelectedProduct();
        setOpenProductCreateDialog(true);
    };

    const handleClose = () => {
        setOpenProductCreateDialog(false);
        clearSelectedProduct();
    };


    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Crear Proveedor
      </Button>
            <Dialog
                fullScreen
                open={openProductCreateDialog}
                onClose={handleClose}
                TransitionComponent={Transition}
            >

                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {titleProductCreateDialog}
                         </Typography>

                        <Button autoFocus color="inherit" onClick={saveOrUpdateProducte}>
                            Guardar
                        </Button>

                    </Toolbar>
                </AppBar>


                <CreateProductForm />

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

// function CreateProductForm(props, ref) {
const CreateProductForm = forwardRef((props, ref) => {
    const classes = useStylesForm();
    const { productInForm, setProductInForm, selectedDate, setSelectedDate, saveOrUpdateProducte } = useProductsContext();

    const submitForm = (event) => {
        event.preventDefault();
        saveOrUpdateProducte();
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        let product = productInForm;
        product.birth_date = fnsFormat(date, 'yyyy-MM-dd');
        setProductInForm(product);
        console.log(productInForm);
    };

    const handleInputChange = (e) => {
        let product = productInForm;
        product[e.target.id] = e.target.value;
        setProductInForm(product);
        console.log(productInForm);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={submitForm}>


            <div className={classes.rootGrid}>
                <Grid container spacing={3}>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="cui" label="DPI" variant="outlined" fullWidth={true} defaultValue={productInForm.cui} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="name1" label="Primer Nombre" variant="outlined" fullWidth={true} defaultValue={productInForm.name1} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="name2" label="Segundo Nombre" variant="outlined" fullWidth={true} defaultValue={productInForm.name2} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="last_name1" label="Primer Apellido" variant="outlined" fullWidth={true} defaultValue={productInForm.last_name1} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="last_name2" label="Segundo Apellido" variant="outlined" fullWidth={true} defaultValue={productInForm.last_name2} onChange={handleInputChange} />
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
                        <TextField id="phone" label="Teléfono" variant="outlined" fullWidth={true} defaultValue={productInForm.phone} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="email" label="Correo @" variant="outlined" fullWidth={true} defaultValue={productInForm.email} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="country" label="País" variant="outlined" fullWidth={true} defaultValue={productInForm.country} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="departament" label="Departamento" variant="outlined" fullWidth={true} defaultValue={productInForm.departament} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="municipality" label="Municipio" variant="outlined" fullWidth={true} defaultValue={productInForm.municipality} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="street" label="Calle" variant="outlined" fullWidth={true} defaultValue={productInForm.street} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="reference" label="Referencia" variant="outlined" fullWidth={true} defaultValue={productInForm.reference} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="zip_code" label="Código postal" variant="outlined" fullWidth={true} defaultValue={productInForm.zip_code} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>


                        <Button variant="contained" startIcon={<SaveIcon />} size="large" color="primary" type="button" fullWidth={true} onClick={saveOrUpdateProducte}>
                            Guardar
                        </Button>

                    </Grid>


                </Grid>
            </div>

        </form>
    );
})