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
            "name": "",
            "description": "",
            "brandId": "",
            "brand": "",
            "supplierId": "",
            "supplier": "",
            "stock": "",
            "unit": "",
            "purchase_price": "",
            "sale_price": "",
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

        setTitleProductCreateDialog('Modificar Producto');
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
                "name": "",
                "description": "",
                "brandId": "",
                "brand": "",
                "supplierId": "",
                "supplier": "",
                "stock": "",
                "unit": "",
                "purchase_price": "",
                "sale_price": "",
            }
        );
    }

    const getAllProducts = () => {
        // console.log('getAllProduct ip:', backendURL);
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
            if (product.isActive) {
                const supplierId = product.supplier ? product.supplier.id : null;
                const supplier = product.supplier ? `${product.supplier.person.name1} ${product.supplier.person.name2} ${product.supplier.person.last_name1} ${product.supplier.person.last_name2}` : '';
                const brandId = product.brand ? product.brand.id : null;
                const brand = product.brand ? product.brand.name : '';
                products.push({
                    no: noProduct++,
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    brandId,
                    brand,
                    supplierId,
                    supplier,
                    stock: product.stock,
                    unit: product.unit,
                    purchase_price: product.purchase_price.toFixed(2),
                    sale_price: product.sale_price.toFixed(2),
                });
            }
        }
        console.log('Flat products');
        console.log(products);
        return products;
    }

    const saveOrUpdateProducte = () => {
        // console.log(productInForm);
        // return;
        if (productInForm.id) {
            updateProduct();
        } else {
            createNewProduct();
        }

    }

    const createNewProduct = () => {

        if (productInForm.name) {
            setOpenProductCreateDialog(false);
            enqueueSnackbar(`Creando producto ${productInForm.name}`, { variant: 'info', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            axios.post(`${backendURL}/products`, productInForm).then(res => {
                enqueueSnackbar(`Producto ${productInForm.name} creado`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
                getAllProducts();
            }).catch(error => {
                enqueueSnackbar(`Error al crear el producto ${productInForm.name}`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            });
        } else {
            enqueueSnackbar(`Necesita al menos el nombre del producto`, { variant: 'warning', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        }

    }

    const updateProduct = () => {
        if (productInForm.name) {
            setOpenProductCreateDialog(false);
            enqueueSnackbar(`Actualizando producto ${productInForm.name}`, { variant: 'info', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            axios.put(`${backendURL}/products`, productInForm).then(res => {
                enqueueSnackbar(`Producto ${productInForm.name} actualizado`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
                getAllProducts();
            }).catch(error => {
                enqueueSnackbar(`Error al actualizar el producto ${productInForm.name}`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            });
        } else {
            enqueueSnackbar(`Necesita al menos el nombre del producto`, { variant: 'warning', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        }
    }

    const switchStateProduct = () => {
        setOpenContextMenuProducts(initialStateContextMenuProduct);
        enqueueSnackbar(`Eliminando producto ${selectedProduct.name}`, { variant: 'info', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        axios.patch(`${backendURL}/products/${selectedProduct.id}`).then(res => {
            enqueueSnackbar(`Producto ${selectedProduct.name} eliminado`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            getAllProducts();
        }).catch(error => {
            enqueueSnackbar(`Error al eliminar el producto ${selectedProduct.name}`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
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