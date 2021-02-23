import React, { Component, useContext, useEffect } from 'react';
import {useAppContext} from '../context/AppContext'
import SuppliersModule from '../modules/suppliers/SuppliersModule';


export default function SuppliersPage(props){
    const {setActualPage} = useAppContext();

    
    useEffect(() => {
        console.log('init suppliers page');
        setActualPage('Proveedores');
        
    }, [])
        
        return (
            <div>
                {/* <h1>Proveedores</h1> */}
                <SuppliersModule/>
            </div>
        )
    
}
