import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import * as moment from "moment";


const SupplersContext = React.createContext();

const initialStateContextMenuProduct = {
    mouseX: null,
    mouseY: null,
};

export function ProductsProvider(props) {

    const backendURL = process.env.REACT_APP_BACKEND_SERVER;

    const [openDetailsProductDialog, setOpenDetailsProductDialog] = useState(false);
    const [titleProductCreateDialog, setTitleProductCreateDialog] = useState(false);
    const [openContextMenuProducts, setOpenContextMenuProducts] = useState(initialStateContextMenuProduct);
    const [openProductCreateDialog, setOpenProductCreateDialog] = useState(false);

    const [productsRepo, setProductsRepo] = useState([]);
    const [laodingProducts, setLaodingProducts] = useState(false);
    const [openDeleteProductDialog, setOpenDeleteProductDialog] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(new Date('1994-06-20T21:11:54'));
    const [selectedDate, setSelectedDate] = useState(null);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productInForm, setProductInForm] = useState(
        {
            "cui": "",
            "name1": "",
            "name2": "",
            "last_name1": "",
            "last_name2": "",
            "birth_date": "",
            "phone": "",
            "email": "",
            "country": "Guatemala",
            "departament": "Izabal",
            "municipality": "Los Amates",
            "street": "",
            "reference": "",
            "zip_code": ""
        }
    );

    const { enqueueSnackbar } = useSnackbar();

    const editProduct = () => {
        setProductInForm(selectedProduct);

        if (moment(selectedProduct.birth_date, 'YYYY-MM-DD').isValid()) {
            setSelectedDate(new Date(moment(selectedProduct.birth_date, 'YYYY-MM-DD').format()));
        } else {
            setSelectedDate(null);
        }

        setTitleProductCreateDialog('Modificar Proveedor');
        setOpenProductCreateDialog(true);
        setOpenContextMenuProducts(initialStateContextMenuProduct);
    }

    const showDetailsProduct = () => {
        setProductInForm(selectedProduct);
        if (moment(selectedProduct.birth_date, 'YYYY-MM-DD').isValid()) {
            setSelectedDate(new Date(moment(selectedProduct.birth_date, 'YYYY-MM-DD').format()));
        } else {
            setSelectedDate(null);
        }
        setOpenDetailsProductDialog(true);
        setOpenContextMenuProducts(initialStateContextMenuProduct);
    }

    const clearSelectedProduct = () => {
        setProductInForm(
            {
                "cui": "",
                "name1": "",
                "name2": "",
                "last_name1": "",
                "last_name2": "",
                "birth_date": "",
                "phone": "",
                "email": "",
                "country": "Guatemala",
                "departament": "Izabal",
                "municipality": "Los Amates",
                "street": "",
                "reference": "",
                "zip_code": ""
            }
        );
    }

    const getAllProducts = () => {
        console.log('getAllProduct ip:', backendURL);
        setLaodingProducts(true);
        axios.get(`${backendURL}/products`)
            .then(res => {
                const products = res.data.products;
                console.log(products);
                setTimeout(() => {
                    setProductsRepo(flatObject(products));
                    setLaodingProducts(false);
                }, 2000);
            })
            .catch(error => {
                setLaodingProducts(false);
                enqueueSnackbar(`Error al cargar los productos`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
                if (error.response) {
                    setLaodingProducts(false);
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }

    const flatObject = (arrayProducts) => {
        let products = [];
        let noProduct = 1;
        for (let index = 0; index < arrayProducts.length; index++) {
            const product = arrayProducts[index];
            if (product.person.isActive) {
                products.push({
                    no: noProduct++,
                    id: product.id,
                    cui: product.person.cui,
                    name1: product.person.name1,
                    name2: product.person.name2,
                    last_name1: product.person.last_name1,
                    last_name2: product.person.last_name2,
                    birth_date: product.person.birth_date,
                    phone: product.person.phone,
                    email: product.person.email,
                    isActive: product.person.isActive,
                    createdAt: product.person.createdAt,
                    updatedAt: product.person.updatedAt,
                    country: product.person.address.country,
                    country: product.person.address.country,
                    departament: product.person.address.departament,
                    municipality: product.person.address.municipality,
                    street: product.person.address.street,
                    reference: product.person.address.reference,
                    zip_code: product.person.address.zip_code,
                });
            }
        }
        return products;
    }

    const saveOrUpdateProducte = () => {
        // enqueueSnackbar(`DEMO`, { variant: 'info', autoHideDuration:2000, anchorOrigin:{ vertical: 'top', horizontal: 'right' } } );
        if (productInForm.id) {
            updateProduct();
        } else {
            createNewProduct();
        }

    }

    const createNewProduct = () => {

        if (productInForm.name1 && productInForm.last_name1) {
            setOpenProductCreateDialog(false);
            enqueueSnackbar(`Creando producto ${productInForm.name1} ${productInForm.last_name1}`, { variant: 'info', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            axios.post(`${backendURL}/products`, productInForm).then(res => {
                enqueueSnackbar(`Proveedor ${productInForm.name1} ${productInForm.last_name1} creado`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
                getAllProducts();
            }).catch(error => {
                enqueueSnackbar(`Error al crear el producto ${productInForm.name1} ${productInForm.last_name1}`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            });
        } else {
            enqueueSnackbar(`Necesita al menos el primer nombre y el primer apellido`, { variant: 'warning', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        }

    }

    const updateProduct = () => {
        if (productInForm.name1 && productInForm.last_name1) {
            setOpenProductCreateDialog(false);
            enqueueSnackbar(`Actualizando producto ${productInForm.name1} ${productInForm.last_name1}`, { variant: 'info', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            axios.put(`${backendURL}/products`, productInForm).then(res => {
                enqueueSnackbar(`Proveedor ${productInForm.name1} ${productInForm.last_name1} actualizado`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
                getAllProducts();
            }).catch(error => {
                enqueueSnackbar(`Error al actualizar el producto ${productInForm.name1} ${productInForm.last_name1}`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            });
        } else {
            enqueueSnackbar(`Necesita al menos el primer nombre y el primer apellido`, { variant: 'warning', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        }
    }

    const switchStateProduct = () => {
        setOpenContextMenuProducts(initialStateContextMenuProduct);
        enqueueSnackbar(`Eliminando producto ${selectedProduct.name1} ${selectedProduct.last_name1}`, { variant: 'info', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        axios.patch(`${backendURL}/products/${selectedProduct.id}`).then(res => {
            enqueueSnackbar(`Proveedor ${selectedProduct.name1} ${selectedProduct.last_name1} eliminado`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            getAllProducts();
        }).catch(error => {
            enqueueSnackbar(`Error al eliminar el producto ${selectedProduct.name1} ${selectedProduct.last_name1}`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        });
    }


    const value = useMemo(() => {
        return ({
            productsRepo,
            setProductsRepo,
            laodingProducts,
            setLaodingProducts,
            getAllProducts,
            productInForm,
            setProductInForm,
            selectedDate,
            setSelectedDate,
            saveOrUpdateProducte,
            selectedProduct,
            setSelectedProduct,
            editProduct,
            clearSelectedProduct,
            showDetailsProduct,
            switchStateProduct,
            openDeleteProductDialog, 
            setOpenDeleteProductDialog,
            openProductCreateDialog, 
            setOpenProductCreateDialog,
            openContextMenuProducts, 
            setOpenContextMenuProducts,
            titleProductCreateDialog, 
            setTitleProductCreateDialog,
            openDetailsProductDialog, 
            setOpenDetailsProductDialog,
        })
    }, [
        productsRepo, 
        productInForm, 
        selectedDate, 
        laodingProducts, 
        selectedProduct, 
        openDeleteProductDialog, 
        openProductCreateDialog, 
        openContextMenuProducts,
        titleProductCreateDialog,
        openDetailsProductDialog,
    ]);

    return <SupplersContext.Provider value={value} {...props} />
}

export function useProductsContext() {
    const context = React.useContext(SupplersContext);
    if (!context) {
        throw new Error('useProductsContext debe estar dentro del producto SupplersContext');
    }
    return context;
}