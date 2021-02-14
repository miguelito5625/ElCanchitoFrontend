import React, { Component, useContext, useEffect } from 'react';
import AppContext from '../context/AppContext'
import ClientsModule from '../modules/clients/ClientsModule';


export default function ClientsPage(props){
    const {actualPage, setActualPage} = useContext(AppContext);

    
    useEffect(() => {
        setActualPage('Clientes');
        
    }, [])
        
        return (
            <div>
                {/* <h1>Clientes</h1> */}
                <ClientsModule/>
            </div>
        )
    
}
