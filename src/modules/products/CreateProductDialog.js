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
import { Autocomplete } from '@material-ui/lab';
import { useSuppliersContext } from '../../context/SuppliersContext';
import { useBrandsContext } from '../../context/BrandsContext';


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
        setTitleProductCreateDialog('Crear Producto');
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
                Crear Producto
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
    const { productInForm, setProductInForm, selectedProduct, saveOrUpdateProducte, titleProductCreateDialog } = useProductsContext();
    const { suppliersRepo } = useSuppliersContext();
    const { brandsRepo } = useBrandsContext();

    const submitForm = (event) => {
        event.preventDefault();
        saveOrUpdateProducte();
    }

    const handleSupplierChange = (event, newValue) => {
        let product = productInForm;
        product['supplierId'] = newValue?newValue.id:null;
        product['supplier'] = newValue?newValue.name:null;
        setProductInForm(product);
        console.log(productInForm);
      };

      const handleBrandChange = (event, newValue) => {
        let product = productInForm;
        product['brandId'] = newValue?newValue.id:null;
        product['brand'] = newValue?newValue.name:null;
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
                        <TextField id="name" label="Nombre" variant="outlined" fullWidth={true} defaultValue={productInForm.name} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="description" label="Descripcion" variant="outlined" fullWidth={true} defaultValue={productInForm.description} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        {/* <TextField id="brandId" label="Marca" variant="outlined" fullWidth={true} defaultValue={productInForm.brandId} onChange={handleInputChange} /> */}

                        <Autocomplete
                            id="combo-box-brands"
                            defaultValue={selectedProduct?{ id: selectedProduct.brandId, name: selectedProduct.brand }:null}
                            options={brandsRepo}
                            getOptionLabel={(option) => option.name}
                            fullWidth={true}
                            onChange={handleBrandChange}
                            renderInput={(params) => <TextField {...params} label="Marca" variant="outlined" />}
                        />

                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        {/* <TextField id="supplierId" label="Provvedor" variant="outlined" fullWidth={true} defaultValue={productInForm.supplierId} onChange={handleInputChange} /> */}

                        <Autocomplete
                            id="combo-box-suppliers"
                            defaultValue={selectedProduct?{ id: selectedProduct.supplierId, fullName: selectedProduct.supplier }:null}
                            options={suppliersRepo}
                            getOptionLabel={(option) => option.fullName}
                            fullWidth={true}
                            onChange={handleSupplierChange}
                            renderInput={(params) => <TextField {...params} label="Proveedor" variant="outlined" />}
                        />

                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="stock" label="Existencia" variant="outlined" fullWidth={true} defaultValue={productInForm.stock} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="unit" label="Unidad" variant="outlined" fullWidth={true} defaultValue={productInForm.unit} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="purchase_price" label="Precio de compra" variant="outlined" fullWidth={true} defaultValue={productInForm.purchase_price} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField id="sale_price" label="Precio de venta" variant="outlined" fullWidth={true} defaultValue={productInForm.sale_price} onChange={handleInputChange} />
                    </Grid>


                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>


                        <Button variant="contained" startIcon={<SaveIcon />} size="large" color="primary" type="button" fullWidth={true} style={{ minHeight: '100%' }} onClick={saveOrUpdateProducte}>
                            Guardar
                        </Button>

                    </Grid>


                </Grid>
            </div>

        </form>
    );
})