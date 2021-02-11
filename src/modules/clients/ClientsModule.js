import React, { Component } from 'react'
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import CustomLoadingOverlay from "./CustomLoadingOverlay";
import CreateClientDialog from './CreateClientDialog'
import { Grid } from '@material-ui/core';

export default class ClientsModule extends Component {

    state = {
        clients: [],
        laodingData: true
    }

    columns = [

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

    componentDidMount() {
        this.getAllClients();
    }

    getAllClients() {
        axios.get(`http://localhost:3000/clients`)
            .then(res => {
                const clients = res.data.clients;
                console.log(clients);

                setTimeout(() => {
                    this.setState({ clients: this.flatObject(clients), laodingData: false });
                }, 2000);

                console.log(this.state.clients);
            })
            .catch(function (error) {
                console.log('ERROR');
                if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                }
              });;
    }

    flatObject(arrayClients) {
        let clients = [];
        for (let index = 0; index < arrayClients.length; index++) {
            const user = arrayClients[index];
            clients.push({
                id: user.id,
                cui: user.person.cui,
                name1: user.person.name1,
                name2: user.person.name2,
                last_name1: user.person.last_name1,
                last_name2: user.person.last_name2,
                phone: user.person.phone,
                email: user.person.email,
            });
        }
        return clients;
    }

    render() {
        return (
            <div>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay,
                            LoadingOverlay: CustomLoadingOverlay,
                        }}
                        loading={this.state.laodingData}
                        rows={this.state.clients}
                        columns={this.columns}
                        pageSize={5}
                        checkboxSelection
                    />
                </div>

                <br/>

                <Grid container justify="center">
                <CreateClientDialog />
                </Grid>

                
            </div>
        )
    }
}
