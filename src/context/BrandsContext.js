import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import * as moment from "moment";


const SupplersContext = React.createContext();

const initialStateContextMenuBrand = {
    mouseX: null,
    mouseY: null,
};

export function BrandsProvider(props) {

    const backendURL = process.env.REACT_APP_BACKEND_SERVER;

    const [openDetailsBrandDialog, setOpenDetailsBrandDialog] = useState(false);
    const [titleBrandCreateDialog, setTitleBrandCreateDialog] = useState(false);
    const [openContextMenuBrands, setOpenContextMenuBrands] = useState(initialStateContextMenuBrand);
    const [openBrandCreateDialog, setOpenBrandCreateDialog] = useState(false);

    const [brandsRepo, setBrandsRepo] = useState([]);
    const [laodingBrands, setLaodingBrands] = useState(false);
    const [openDeleteBrandDialog, setOpenDeleteBrandDialog] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(new Date('1994-06-20T21:11:54'));
    const [selectedDate, setSelectedDate] = useState(null);

    const [selectedBrand, setSelectedBrand] = useState(null);
    const [brandInForm, setBrandInForm] = useState(
        {
            "name": "",
            "description": "",
        }
    );

    const { enqueueSnackbar } = useSnackbar();

    const editBrand = () => {
        setBrandInForm(selectedBrand);

        if (moment(selectedBrand.birth_date, 'YYYY-MM-DD').isValid()) {
            setSelectedDate(new Date(moment(selectedBrand.birth_date, 'YYYY-MM-DD').format()));
        } else {
            setSelectedDate(null);
        }

        setTitleBrandCreateDialog('Modificar Brando');
        setOpenBrandCreateDialog(true);
        setOpenContextMenuBrands(initialStateContextMenuBrand);
    }

    const showDetailsBrand = () => {
        setBrandInForm(selectedBrand);
        if (moment(selectedBrand.birth_date, 'YYYY-MM-DD').isValid()) {
            setSelectedDate(new Date(moment(selectedBrand.birth_date, 'YYYY-MM-DD').format()));
        } else {
            setSelectedDate(null);
        }
        setOpenDetailsBrandDialog(true);
        setOpenContextMenuBrands(initialStateContextMenuBrand);
    }

    const clearSelectedBrand = () => {
        setBrandInForm(
            {
                "name": "",
                "description": "",
            }
        );
    }

    const getAllBrands = () => {
        // console.log('getAllBrand ip:', backendURL);
        setLaodingBrands(true);
        axios.get(`${backendURL}/brands`)
            .then(res => {
                const brands = res.data.brands;
                console.log(brands);
                setTimeout(() => {
                    setBrandsRepo(flatObject(brands));
                    setLaodingBrands(false);
                }, 2000);
            })
            .catch(error => {
                setLaodingBrands(false);
                enqueueSnackbar(`Error al cargar los marcas`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
                if (error.response) {
                    setLaodingBrands(false);
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }

    const flatObject = (arrayBrands) => {
        let brands = [];
        let noBrand = 1;
        for (let index = 0; index < arrayBrands.length; index++) {
            const brand = arrayBrands[index];
            if (brand.isActive) {
                brands.push({
                    no: noBrand++,
                    id: brand.id,
                    name: brand.name,
                    description: brand.description,
                });
            }
        }
        console.log('Flat brands');
        console.log(brands);
        return brands;
    }

    const saveOrUpdateBrande = () => {
        // enqueueSnackbar(`DEMO`, { variant: 'info', autoHideDuration:2000, anchorOrigin:{ vertical: 'top', horizontal: 'right' } } );
        if (brandInForm.id) {
            updateBrand();
        } else {
            createNewBrand();
        }

    }

    const createNewBrand = () => {

        if (brandInForm.name) {
            setOpenBrandCreateDialog(false);
            enqueueSnackbar(`Creando marca ${brandInForm.name}`, { variant: 'info', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            axios.post(`${backendURL}/brands`, brandInForm).then(res => {
                enqueueSnackbar(`Marca ${brandInForm.name} creada`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
                getAllBrands();
            }).catch(error => {
                enqueueSnackbar(`Error al crear la marca ${brandInForm.name}`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            });
        } else {
            enqueueSnackbar(`Necesita al menos el nombre de la marca`, { variant: 'warning', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        }

    }

    const updateBrand = () => {
        if (brandInForm.name) {
            setOpenBrandCreateDialog(false);
            enqueueSnackbar(`Actualizando marca ${brandInForm.name}`, { variant: 'info', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            axios.put(`${backendURL}/brands`, brandInForm).then(res => {
                enqueueSnackbar(`Marca ${brandInForm.name} actualizada`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
                getAllBrands();
            }).catch(error => {
                enqueueSnackbar(`Error al actualizar la marca ${brandInForm.name}`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            });
        } else {
            enqueueSnackbar(`Necesita al menos el nombre de la marca`, { variant: 'warning', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        }
    }

    const switchStateBrand = () => {
        setOpenContextMenuBrands(initialStateContextMenuBrand);
        enqueueSnackbar(`Eliminando marca ${selectedBrand.name}`, { variant: 'info', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        axios.patch(`${backendURL}/brands/${selectedBrand.id}`).then(res => {
            enqueueSnackbar(`Marca ${selectedBrand.name} eliminada`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            getAllBrands();
        }).catch(error => {
            enqueueSnackbar(`Error al eliminar la marca ${selectedBrand.name}`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        });
    }


    const value = useMemo(() => {
        return ({
            brandsRepo,
            setBrandsRepo,
            laodingBrands,
            setLaodingBrands,
            getAllBrands,
            brandInForm,
            setBrandInForm,
            selectedDate,
            setSelectedDate,
            saveOrUpdateBrande,
            selectedBrand,
            setSelectedBrand,
            editBrand,
            clearSelectedBrand,
            showDetailsBrand,
            switchStateBrand,
            openDeleteBrandDialog, 
            setOpenDeleteBrandDialog,
            openBrandCreateDialog, 
            setOpenBrandCreateDialog,
            openContextMenuBrands, 
            setOpenContextMenuBrands,
            titleBrandCreateDialog, 
            setTitleBrandCreateDialog,
            openDetailsBrandDialog, 
            setOpenDetailsBrandDialog,
        })
    }, [
        brandsRepo, 
        brandInForm, 
        selectedDate, 
        laodingBrands, 
        selectedBrand, 
        openDeleteBrandDialog, 
        openBrandCreateDialog, 
        openContextMenuBrands,
        titleBrandCreateDialog,
        openDetailsBrandDialog,
    ]);

    return <SupplersContext.Provider value={value} {...props} />
}

export function useBrandsContext() {
    const context = React.useContext(SupplersContext);
    if (!context) {
        throw new Error('useBrandsContext debe estar dentro dla marca SupplersContext');
    }
    return context;
}