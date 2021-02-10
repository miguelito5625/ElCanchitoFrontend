import React, { Component } from 'react';
import AppContext from '../context/AppContext'
import ClientsModule from '../modules/clients/ClientsModule';


export default class ClientsPage extends Component {

    static contextType = AppContext

    constructor(props) {
        super(props);
        this.state = {
            val1: 'any'
        };
      }

    componentDidMount() {
    
        const { actualPage, setActualPage } = this.context;
        setActualPage('Clientes');
          
    }

    render() {
        
        return (
            <div>
                {/* <h1>Clientes</h1> */}

                <ClientsModule/>

            </div>
        )
    }
}
