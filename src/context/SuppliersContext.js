import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useAppContext } from './AppContext';
import * as moment from "moment";


const SupplersContext = React.createContext();

const initialStateContextMenuSupplier = {
    mouseX: null,
    mouseY: null,
};

export function SuppliersProvider(props) {

    const backendURL = process.env.REACT_APP_BACKEND_SERVER;

    const [openDetailsSupplierDialog, setOpenDetailsSupplierDialog] = useState(false);
    const [titleSupplierCreateDialog, setTitleSupplierCreateDialog] = useState(false);
    const [openContextMenuSuppliers, setOpenContextMenuSuppliers] = useState(initialStateContextMenuSupplier);
    const [openSupplierCreateDialog, setOpenSupplierCreateDialog] = useState(false);

    const [suppliersRepo, setSuppliersRepo] = useState([]);
    const [laodingSuppliers, setLaodingSuppliers] = useState(false);
    const [openDeleteSupplierDialog, setOpenDeleteSupplierDialog] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(new Date('1994-06-20T21:11:54'));
    const [selectedDate, setSelectedDate] = useState(null);

    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [supplierInForm, setSupplierInForm] = useState(
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

    const editSupplier = () => {
        setSupplierInForm(selectedSupplier);

        if (moment(selectedSupplier.birth_date, 'YYYY-MM-DD').isValid()) {
            setSelectedDate(new Date(moment(selectedSupplier.birth_date, 'YYYY-MM-DD').format()));
        } else {
            setSelectedDate(null);
        }

        setTitleSupplierCreateDialog('Modificar Proveedor');
        setOpenSupplierCreateDialog(true);
        setOpenContextMenuSuppliers(initialStateContextMenuSupplier);
    }

    const showDetailsSupplier = () => {
        setSupplierInForm(selectedSupplier);
        if (moment(selectedSupplier.birth_date, 'YYYY-MM-DD').isValid()) {
            setSelectedDate(new Date(moment(selectedSupplier.birth_date, 'YYYY-MM-DD').format()));
        } else {
            setSelectedDate(null);
        }
        setOpenDetailsSupplierDialog(true);
        setOpenContextMenuSuppliers(initialStateContextMenuSupplier);
    }

    const clearSelectedSupplier = () => {
        setSupplierInForm(
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

    const getAllSuppliers = () => {
        console.log('getAllSupplier ip:', backendURL);
        setLaodingSuppliers(true);
        axios.get(`${backendURL}/suppliers`)
            .then(res => {
                const suppliers = res.data.suppliers;
                console.log(suppliers);
                setTimeout(() => {
                    setSuppliersRepo(flatObject(suppliers));
                    setLaodingSuppliers(false);
                }, 2000);
            })
            .catch(error => {
                setLaodingSuppliers(false);
                enqueueSnackbar(`Error al cargar los proveedores`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
                if (error.response) {
                    setLaodingSuppliers(false);
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }

    const flatObject = (arraySuppliers) => {
        let suppliers = [];
        let noSupplier = 1;
        for (let index = 0; index < arraySuppliers.length; index++) {
            const supplier = arraySuppliers[index];
            if (supplier.person.isActive) {
                suppliers.push({
                    no: noSupplier++,
                    id: supplier.id,
                    cui: supplier.person.cui,
                    name1: supplier.person.name1,
                    name2: supplier.person.name2,
                    last_name1: supplier.person.last_name1,
                    last_name2: supplier.person.last_name2,
                    birth_date: supplier.person.birth_date,
                    phone: supplier.person.phone,
                    email: supplier.person.email,
                    isActive: supplier.person.isActive,
                    createdAt: supplier.person.createdAt,
                    updatedAt: supplier.person.updatedAt,
                    country: supplier.person.address.country,
                    country: supplier.person.address.country,
                    departament: supplier.person.address.departament,
                    municipality: supplier.person.address.municipality,
                    street: supplier.person.address.street,
                    reference: supplier.person.address.reference,
                    zip_code: supplier.person.address.zip_code,
                });
            }
        }
        return suppliers;
    }

    const saveOrUpdateSuppliere = () => {
        // enqueueSnackbar(`DEMO`, { variant: 'info', autoHideDuration:2000, anchorOrigin:{ vertical: 'top', horizontal: 'right' } } );
        if (supplierInForm.id) {
            updateSupplier();
        } else {
            createNewSupplier();
        }

    }

    const createNewSupplier = () => {

        if (supplierInForm.name1 && supplierInForm.last_name1) {
            setOpenSupplierCreateDialog(false);
            enqueueSnackbar(`Creando proveedor ${supplierInForm.name1} ${supplierInForm.last_name1}`, { variant: 'info', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            axios.post(`${backendURL}/suppliers`, supplierInForm).then(res => {
                enqueueSnackbar(`Proveedor ${supplierInForm.name1} ${supplierInForm.last_name1} creado`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
                getAllSuppliers();
            }).catch(error => {
                enqueueSnackbar(`Error al crear el proveedor ${supplierInForm.name1} ${supplierInForm.last_name1}`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            });
        } else {
            enqueueSnackbar(`Necesita al menos el primer nombre y el primer apellido`, { variant: 'warning', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        }

    }

    const updateSupplier = () => {
        if (supplierInForm.name1 && supplierInForm.last_name1) {
            setOpenSupplierCreateDialog(false);
            enqueueSnackbar(`Actualizando proveedor ${supplierInForm.name1} ${supplierInForm.last_name1}`, { variant: 'info', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            axios.put(`${backendURL}/suppliers`, supplierInForm).then(res => {
                enqueueSnackbar(`Proveedor ${supplierInForm.name1} ${supplierInForm.last_name1} actualizado`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
                getAllSuppliers();
            }).catch(error => {
                enqueueSnackbar(`Error al actualizar el proveedor ${supplierInForm.name1} ${supplierInForm.last_name1}`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            });
        } else {
            enqueueSnackbar(`Necesita al menos el primer nombre y el primer apellido`, { variant: 'warning', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        }
    }

    const switchStateSupplier = () => {
        setOpenContextMenuSuppliers(initialStateContextMenuSupplier);
        enqueueSnackbar(`Eliminando proveedor ${selectedSupplier.name1} ${selectedSupplier.last_name1}`, { variant: 'info', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        axios.patch(`${backendURL}/suppliers/${selectedSupplier.id}`).then(res => {
            enqueueSnackbar(`Proveedor ${selectedSupplier.name1} ${selectedSupplier.last_name1} eliminado`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            getAllSuppliers();
        }).catch(error => {
            enqueueSnackbar(`Error al eliminar el proveedor ${selectedSupplier.name1} ${selectedSupplier.last_name1}`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        });
    }


    const value = useMemo(() => {
        return ({
            suppliersRepo,
            setSuppliersRepo,
            laodingSuppliers,
            setLaodingSuppliers,
            getAllSuppliers,
            supplierInForm,
            setSupplierInForm,
            selectedDate,
            setSelectedDate,
            saveOrUpdateSuppliere,
            selectedSupplier,
            setSelectedSupplier,
            editSupplier,
            clearSelectedSupplier,
            showDetailsSupplier,
            switchStateSupplier,
            openDeleteSupplierDialog, 
            setOpenDeleteSupplierDialog,
            openSupplierCreateDialog, 
            setOpenSupplierCreateDialog,
            openContextMenuSuppliers, 
            setOpenContextMenuSuppliers,
            titleSupplierCreateDialog, 
            setTitleSupplierCreateDialog,
            openDetailsSupplierDialog, 
            setOpenDetailsSupplierDialog,
        })
    }, [
        suppliersRepo, 
        supplierInForm, 
        selectedDate, 
        laodingSuppliers, 
        selectedSupplier, 
        openDeleteSupplierDialog, 
        openSupplierCreateDialog, 
        openContextMenuSuppliers,
        titleSupplierCreateDialog,
        openDetailsSupplierDialog,
    ]);

    return <SupplersContext.Provider value={value} {...props} />
}

export function useSuppliersContext() {
    const context = React.useContext(SupplersContext);
    if (!context) {
        throw new Error('useSuppliersContext debe estar dentro del proveedor SupplersContext');
    }
    return context;
}