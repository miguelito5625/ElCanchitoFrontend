import React, { Component, useEffect } from 'react'
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import CustomLoadingOverlay from "./CustomLoadingOverlay";
import CreateClientDialog from './CreateClientDialog'
import { Grid } from '@material-ui/core';

export default function ClientsModule(props) {

    const [clientsState, setClientsState] = React.useState([]);
    const [laodingDataState, setLaodingDataState] = React.useState(true);


    const columns = [

        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'cui', headerName: 'DPI', width: 180 },

        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 300,
            valueGetter: (params) =>
                `${params.getValue('name1') || ''} ${params.getValue('name2') || ''} ${params.getValue('last_name1') || ''} ${params.getValue('last_name2') || ''}`,
        },

        { field: 'phone', headerName: 'Telefono', width: 130 },
        { field: 'email', headerName: 'correo', width: 180 },

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
    }, [])

    const getAllClients = () => {
        axios.get(`http://localhost:3000/clients`)
            .then(res => {
                const clients = res.data.clients;
                console.log(clients);

                setTimeout(() => {
                    setClientsState(flatObject(clients));
                    setLaodingDataState(false);
                }, 2000);

                console.log(this.state.clients);
            })
            .catch(error => {
                if (error.response) {
                    setLaodingDataState(false);
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });;
    }

    const flatObject = (arrayClients) => {
        let clients = [];
        for (let index = 0; index < arrayClients.length; index++) {
            const client = arrayClients[index];
            clients.push({
                id: client.id,
                cui: client.person.cui,
                name1: client.person.name1,
                name2: client.person.name2,
                last_name1: client.person.last_name1,
                last_name2: client.person.last_name2,
                phone: client.person.phone,
                email: client.person.email,
            });
        }
        return clients;
    }

    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    components={{
                        NoRowsOverlay: CustomNoRowsOverlay,
                        LoadingOverlay: CustomLoadingOverlay,
                    }}
                    loading={laodingDataState}
                    rows={clientsState}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                />
            </div>

            <br />

            <Grid container justify="center">
                <CreateClientDialog />
            </Grid>


        </div>
    )
}