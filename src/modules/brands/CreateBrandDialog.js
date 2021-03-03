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
import { useBrandsContext } from "../../context/BrandsContext";
import { useAppContext } from '../../context/AppContext';
import { Autocomplete } from '@material-ui/lab';
import { useSuppliersContext } from '../../context/SuppliersContext';


const useStylesCreateBrandDialog = makeStyles((theme) => ({
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

export default function CreateBrandDialog() {
    const classes = useStylesCreateBrandDialog();

    const {
        saveOrUpdateBrande,
        clearSelectedBrand,
        setSelectedDate,
        openBrandCreateDialog,
        setOpenBrandCreateDialog,
        titleBrandCreateDialog,
        setTitleBrandCreateDialog
    } = useBrandsContext();


    const handleClickOpen = () => {
        setSelectedDate(null);
        setTitleBrandCreateDialog('Crear Brando');
        clearSelectedBrand();
        setOpenBrandCreateDialog(true);
    };

    const handleClose = () => {
        setOpenBrandCreateDialog(false);
        clearSelectedBrand();
    };


    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Crear Brando
      </Button>
            <Dialog
                fullScreen
                open={openBrandCreateDialog}
                onClose={handleClose}
                TransitionComponent={Transition}
            >

                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {titleBrandCreateDialog}
                        </Typography>

                        <Button autoFocus color="inherit" onClick={saveOrUpdateBrande}>
                            Guardar
                        </Button>

                    </Toolbar>
                </AppBar>


                <CreateBrandForm />

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

// function CreateBrandForm(props, ref) {
const CreateBrandForm = forwardRef((props, ref) => {
    const classes = useStylesForm();
    const { brandInForm, setBrandInForm, selectedDate, setSelectedDate, saveOrUpdateBrande } = useBrandsContext();
    const { suppliersRepo } = useSuppliersContext();

    const submitForm = (event) => {
        event.preventDefault();
        saveOrUpdateBrande();
    }

    const handleSupplierChange = (event, newValue) => {
        let brand = brandInForm;
        brand['supplierId'] = newValue?newValue.id:null;
        setBrandInForm(brand);
        console.log(brandInForm);
      };

    const handleInputChange = (e) => {
        let brand = brandInForm;
        brand[e.target.id] = e.target.value;
        setBrandInForm(brand);
        console.log(brandInForm);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={submitForm}>


            <div className={classes.rootGrid}>
                <Grid container spacing={3}>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="name" label="Nombre" variant="outlined" fullWidth={true} defaultValue={brandInForm.name} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="description" label="Descripcion" variant="outlined" fullWidth={true} defaultValue={brandInForm.description} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>

                        <Button variant="contained" startIcon={<SaveIcon />} size="large" color="primary" type="button" fullWidth={true} style={{ minHeight: '100%' }} onClick={saveOrUpdateBrande}>
                            Guardar
                        </Button>

                    </Grid>


                </Grid>
            </div>

        </form>
    );
})