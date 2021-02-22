import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useAppContext } from './AppContext';
import * as moment from "moment";


const ClientsContext = React.createContext();

const initialStateContextMenuClient = {
    mouseX: null,
    mouseY: null,
};

export function ClientsProvider(props) {

    const backendURL = process.env.REACT_APP_BACKEND_SERVER;
    const { setOpenClientDialog, setOpenContextMenuClients, setTitleClientDialog, setOpenDetailsClientDialog } = useAppContext();
    const [clientsRepo, setClientsRepo] = useState([]);
    const [laodingClients, setLaodingClients] = useState(false);
    const [openDeleteClientDialog, setOpenDeleteClientDialog] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(new Date('1994-06-20T21:11:54'));
    const [selectedDate, setSelectedDate] = useState(null);

    const [selectedClient, setSelectedClient] = useState(null);
    const [clientInForm, setClientInForm] = useState(
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

    const editClient = () => {
        setClientInForm(selectedClient);

        if (moment(selectedClient.birth_date, 'YYYY-MM-DD').isValid()) {
            setSelectedDate(new Date(moment(selectedClient.birth_date, 'YYYY-MM-DD').format()));
        } else {
            setSelectedDate(null);
        }

        setTitleClientDialog('Modificar Cliente');
        setOpenClientDialog(true);
        setOpenContextMenuClients(initialStateContextMenuClient);
    }

    const showDetailsClient = () => {
        setClientInForm(selectedClient);
        if (moment(selectedClient.birth_date, 'YYYY-MM-DD').isValid()) {
            setSelectedDate(new Date(moment(selectedClient.birth_date, 'YYYY-MM-DD').format()));
        } else {
            setSelectedDate(null);
        }
        setOpenDetailsClientDialog(true);
        setOpenContextMenuClients(initialStateContextMenuClient);
    }

    const clearSelectedClient = () => {
        setClientInForm(
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

    const getAllClients = () => {
        console.log('getAllClient ip:', backendURL);
        setLaodingClients(true);
        axios.get(`${backendURL}/clients`)
            .then(res => {
                const clients = res.data.clients;
                console.log(clients);
                setTimeout(() => {
                    setClientsRepo(flatObject(clients));
                    setLaodingClients(false);
                }, 2000);
            })
            .catch(error => {
                setLaodingClients(false);
                enqueueSnackbar(`Error al cargar los clientes`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
                if (error.response) {
                    setLaodingClients(false);
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }

    const flatObject = (arrayClients) => {
        let clients = [];
        let noClient = 1;
        for (let index = 0; index < arrayClients.length; index++) {
            const client = arrayClients[index];
            if (client.person.isActive) {
                clients.push({
                    no: noClient++,
                    id: client.id,
                    cui: client.person.cui,
                    name1: client.person.name1,
                    name2: client.person.name2,
                    last_name1: client.person.last_name1,
                    last_name2: client.person.last_name2,
                    birth_date: client.person.birth_date,
                    phone: client.person.phone,
                    email: client.person.email,
                    isActive: client.person.isActive,
                    createdAt: client.person.createdAt,
                    updatedAt: client.person.updatedAt,
                    country: client.person.address.country,
                    country: client.person.address.country,
                    departament: client.person.address.departament,
                    municipality: client.person.address.municipality,
                    street: client.person.address.street,
                    reference: client.person.address.reference,
                    zip_code: client.person.address.zip_code,
                });
            }
        }
        return clients;
    }

    const saveOrUpdateCliente = () => {
        // enqueueSnackbar(`DEMO`, { variant: 'info', autoHideDuration:2000, anchorOrigin:{ vertical: 'top', horizontal: 'right' } } );
        if (clientInForm.id) {
            updateClient();
        } else {
            createNewClient();
        }

    }

    const createNewClient = () => {

        if (clientInForm.name1 && clientInForm.last_name1) {
            setOpenClientDialog(false);
            enqueueSnackbar(`Creando cliente ${clientInForm.name1} ${clientInForm.last_name1}`, { variant: 'info', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            axios.post(`${backendURL}/clients`, clientInForm).then(res => {
                enqueueSnackbar(`Cliente ${clientInForm.name1} ${clientInForm.last_name1} creado`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
                getAllClients();
            }).catch(error => {
                enqueueSnackbar(`Error al crear el cliente ${clientInForm.name1} ${clientInForm.last_name1}`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            });
        } else {
            enqueueSnackbar(`Necesita al menos el primer nombre y el primer apellido`, { variant: 'warning', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        }

    }

    const updateClient = () => {
        if (clientInForm.name1 && clientInForm.last_name1) {
            setOpenClientDialog(false);
            enqueueSnackbar(`Actualizando cliente ${clientInForm.name1} ${clientInForm.last_name1}`, { variant: 'info', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            axios.put(`${backendURL}/clients`, clientInForm).then(res => {
                enqueueSnackbar(`Cliente ${clientInForm.name1} ${clientInForm.last_name1} actualizado`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
                getAllClients();
            }).catch(error => {
                enqueueSnackbar(`Error al actualizar el cliente ${clientInForm.name1} ${clientInForm.last_name1}`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            });
        } else {
            enqueueSnackbar(`Necesita al menos el primer nombre y el primer apellido`, { variant: 'warning', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        }
    }

    const switchStateClient = () => {
        setOpenContextMenuClients(initialStateContextMenuClient);
        enqueueSnackbar(`Eliminando cliente ${selectedClient.name1} ${selectedClient.last_name1}`, { variant: 'info', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        axios.patch(`${backendURL}/clients/${selectedClient.id}`).then(res => {
            enqueueSnackbar(`Cliente ${selectedClient.name1} ${selectedClient.last_name1} eliminado`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
            getAllClients();
        }).catch(error => {
            enqueueSnackbar(`Error al eliminar el cliente ${selectedClient.name1} ${selectedClient.last_name1}`, { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        });
    }


    const value = useMemo(() => {
        return ({
            clientsRepo,
            setClientsRepo,
            laodingClients,
            setLaodingClients,
            getAllClients,
            clientInForm,
            setClientInForm,
            selectedDate,
            setSelectedDate,
            saveOrUpdateCliente,
            selectedClient,
            setSelectedClient,
            editClient,
            clearSelectedClient,
            showDetailsClient,
            switchStateClient,
            openDeleteClientDialog, 
            setOpenDeleteClientDialog,
        })
    }, [clientsRepo, clientInForm, selectedDate, laodingClients, selectedClient, openDeleteClientDialog]);

    return <ClientsContext.Provider value={value} {...props} />
}

export function useClientsContext() {
    const context = React.useContext(ClientsContext);
    if (!context) {
        throw new Error('useClientsContext debe estar dentro del proveedor ClientsContext');
    }
    return context;
}