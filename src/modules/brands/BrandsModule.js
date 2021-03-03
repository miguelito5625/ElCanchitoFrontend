import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import CustomLoadingOverlay from "./CustomLoadingOverlay";
import CreateBrandDialog from './CreateBrandDialog'
import {  Grid } from '@material-ui/core';
import { useBrandsContext } from "../../context/BrandsContext";
import ContextMenuBrands from "./ContextMenuBrands";
import DetailsBrandDialog from './DetailsBrandDialog';
import ConfirmDeleteBrandDialog from './ConfirmDeleteBrandDialog';
import { useSuppliersContext } from '../../context/SuppliersContext';

export default function BrandsModule(props) {

    const { brandsRepo, laodingBrands, getAllBrands, selectedBrand, setSelectedBrand, setOpenContextMenuBrands } = useBrandsContext();
    const { getAllSuppliers } = useSuppliersContext();

    const openContextMenu = (event) => {
        event.preventDefault();
        if (selectedBrand) {
            setOpenContextMenuBrands({
                mouseX: event.clientX - 2,
                mouseY: event.clientY - 4,
            });
        }

    };

    const columns = [

        { field: 'no', headerName: 'No.', width: 100 },
        { field: 'name', headerName: 'Marca', width: 180 },
        { field: 'description', headerName: 'Descripcion', width: 230 },

    ];

    let intervalGetAllBrands;

    //On mount component
    useEffect(() => {
        console.log('BrandsModule Starts');
        getAllBrands();
        getAllSuppliers();
    }, []);



    const onRowSelection = (newSelection) => {
        setSelectedBrand(newSelection.row);
    }

    return (
        <>
        <ConfirmDeleteBrandDialog/>
            <ContextMenuBrands />
            <div style={{ height: 400, width: '100%' }} onContextMenu={openContextMenu}>
                <DataGrid
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    components={{
                        NoRowsOverlay: CustomNoRowsOverlay,
                        LoadingOverlay: CustomLoadingOverlay,
                    }}
                    loading={laodingBrands}
                    rows={brandsRepo}
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
                <CreateBrandDialog />
                <DetailsBrandDialog />
            </Grid>


        </>
    )
}