import React, { Component, useEffect } from 'react'
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import CustomLoadingOverlay from "./CustomLoadingOverlay";
import CreateClientDialog from './CreateClientDialog'
import { Button, Grid } from '@material-ui/core';
import { useClientsContext } from "../../context/ClientsContext";

export default function ClientsModule(props) {

    const { clientsRepo, laodingClients, getAllClients } = useClientsContext();

    const editClient = () => {
        console.log('boton presionado');
    }

    const columns = [

        { field: 'id', headerName: 'ID', width: 70 },
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

        {
            field: 'actions',
            headerName: 'Acciones',
            width: 180,
            renderCell: () => (

                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={editClient}
                >
                    Modificar
                </Button>

            ),
        },

        // {
        //     field: 'age',
        //     headerName: 'Age',
        //     type: 'number',
        //     width: 90,
        // },

    ];

    useEffect(() => {
        console.log('ClientsModule Starts');
        getAllClients();
    }, []);

    const onRowSelection = (newSelection) => {
        console.log(newSelection.row);
    }



    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
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
                />
            </div>

            <br />

            <Grid container justify="center">
                <CreateClientDialog />
            </Grid>


        </div>
    )
}