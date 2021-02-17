import React, { Component, useContext, useEffect } from 'react';
import {useAppContext} from '../context/AppContext'
import ClientsModule from '../modules/clients/ClientsModule';


export default function ClientsPage(props){
    const {setActualPage} = useAppContext();

    
    useEffect(() => {
        console.log('init clients page');
        setActualPage('Clientes');
        
    }, [])
        
        return (
            <div>
                {/* <h1>Clientes</h1> */}
                <ClientsModule/>
            </div>
        )
    
}
