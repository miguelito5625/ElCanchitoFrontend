import React, { Component, useEffect, useState } from 'react'
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import CustomLoadingOverlay from "./CustomLoadingOverlay";
import CreateSupplierDialog from './CreateSupplierDialog'
import {  Grid } from '@material-ui/core';
import { useSuppliersContext } from "../../context/SuppliersContext";
import ContextMenuSuppliers from "./ContextMenuSuppliers";
import DetailsSupplierDialog from './DetailsSupplierDialog';
import ConfirmDeleteSupplierDialog from './ConfirmDeleteSupplierDialog';

export default function SuppliersModule(props) {

    const { suppliersRepo, laodingSuppliers, getAllSuppliers, selectedSupplier, setSelectedSupplier, setOpenContextMenuSuppliers } = useSuppliersContext();

    const openContextMenu = (event) => {
        event.preventDefault();
        if (selectedSupplier) {
            setOpenContextMenuSuppliers({
                mouseX: event.clientX - 2,
                mouseY: event.clientY - 4,
            });
        }

    };

    const columns = [

        { field: 'no', headerName: 'No.', width: 100 },
        { field: 'cui', headerName: 'DPI', width: 180 },

        {
            field: 'proveedor',
            headerName: 'Proveedor',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 300,
            valueGetter: (params) =>
                `${params.getValue('name1') || ''} ${params.getValue('name2') || ''} ${params.getValue('last_name1') || ''} ${params.getValue('last_name2') || ''}`,
        },

        { field: 'phone', headerName: 'Telefono', width: 130 },
        { field: 'email', headerName: 'correo', width: 180 },

    ];

    let intervalGetAllSuppliers;

    //On mount component
    useEffect(() => {
        console.log('SuppliersModule Starts');
        getAllSuppliers();
    }, []);



    const onRowSelection = (newSelection) => {
        setSelectedSupplier(newSelection.row);
    }

    return (
        <>
        <ConfirmDeleteSupplierDialog/>
            <ContextMenuSuppliers />
            <div style={{ height: 400, width: '100%' }} onContextMenu={openContextMenu}>
                <DataGrid
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    components={{
                        NoRowsOverlay: CustomNoRowsOverlay,
                        LoadingOverlay: CustomLoadingOverlay,
                    }}
                    loading={laodingSuppliers}
                    rows={suppliersRepo}
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
                <CreateSupplierDialog />
                <DetailsSupplierDialog />
            </Grid>


        </>
    )
}