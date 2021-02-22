import React, { Component, useEffect, useState } from 'react'
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import CustomLoadingOverlay from "./CustomLoadingOverlay";
import CreateClientDialog from './CreateClientDialog'
import { Button, Grid } from '@material-ui/core';
import { useClientsContext } from "../../context/ClientsContext";
import { useAppContext } from '../../context/AppContext';
import ContextMenuClients from "./ContextMenuClients";
import DetailsClientDialog from './DetailsClientDialog';
import ConfirmDeleteClientDialog from './ConfirmDeleteClientDialog';

export default function ClientsModule(props) {

    const { clientsRepo, laodingClients, getAllClients, selectedClient, setSelectedClient } = useClientsContext();
    const { setOpenContextMenuClients } = useAppContext();

    const openContextMenu = (event) => {
        event.preventDefault();
        if (selectedClient) {
            setOpenContextMenuClients({
                mouseX: event.clientX - 2,
                mouseY: event.clientY - 4,
            });
        }

    };

    const columns = [

        { field: 'no', headerName: 'No.', width: 100 },
        { field: 'cui', headerName: 'DPI', width: 180 },

        {
            field: 'cliente',
            headerName: 'Cliente',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 300,
            valueGetter: (params) =>
                `${params.getValue('name1') || ''} ${params.getValue('name2') || ''} ${params.getValue('last_name1') || ''} ${params.getValue('last_name2') || ''}`,
        },

        { field: 'phone', headerName: 'Telefono', width: 130 },
        { field: 'email', headerName: 'correo', width: 180 },

        // {
        //     field: 'actions',
        //     headerName: 'Acciones',
        //     width: 180,
        //     renderCell: () => (

        //         <Button
        //             variant="contained"
        //             color="primary"
        //             size="small"
        //             style={{ marginLeft: 16 }}
        //             onClick={editClient}
        //         >
        //             Modificar
        //         </Button>

        //     ),
        // },

        // {
        //     field: 'age',
        //     headerName: 'Age',
        //     type: 'number',
        //     width: 90,
        // },

    ];

    let intervalGetAllClients;

    //On mount component
    useEffect(() => {
        console.log('ClientsModule Starts');
        getAllClients();
        // intervalGetAllClients = setInterval(() => {
        //     console.log('Cargando clientes');
        //     getAllClients();
        // }, 2000);
        
    }, []);

    //On unmount Component 
    // useEffect( () => () => {
    //     console.log("unmount");
    //     console.log(intervalGetAllClients);
    //     clearInterval(intervalGetAllClients);
    // }, [] );


    const onRowSelection = (newSelection) => {
        setSelectedClient(newSelection.row);
    }

    return (
        <>
        <ConfirmDeleteClientDialog/>
            <ContextMenuClients />
            <div style={{ height: 400, width: '100%' }} onContextMenu={openContextMenu}>
                <DataGrid
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    components={{
                        NoRowsOverlay: CustomNoRowsOverlay,
                        LoadingOverlay: CustomLoadingOverlay,
                    }}
                    loading={laodingClients}
                    rows={clientsRepo}
                    columns={columns}
                    pageSize={5}
                    onRowClick={onRowSelection}
                    localeText={
                        {
                            footerPaginationRowsPerPage: 'Filas por página:',
                            footerRowSelected: (count) => '',
                            columnMenuLabel: 'Menu',
                            columnMenuShowColumns: 'Mostrar columnas',
                            columnMenuFilter: 'Filtrar',
                            columnMenuHideColumn: 'Ocultar',
                            columnMenuUnsort: 'Orden inicial',
                            columnMenuSortAsc: 'Orden ascendente',
                            columnMenuSortDesc: 'Orden descendente',
                        }
                    }
                // onSelectionChange={(newSelection) => {
                //     console.log(newSelection);

                // }}
                />
            </div>

            <br />

            <Grid container justify="center">
                <CreateClientDialog />
                <DetailsClientDialog />
            </Grid>


        </>
    )
}