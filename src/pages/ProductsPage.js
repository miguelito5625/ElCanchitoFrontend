import React, { useEffect } from 'react';
import {useAppContext} from '../context/AppContext'
import ProductsModule from '../modules/products/ProductsModule';


export default function ProductsPage(props){
    const {setActualPage} = useAppContext();

    
    useEffect(() => {
        console.log('init products page');
        setActualPage('Productos');
        
    }, [])
        
        return (
            <div>
                {/* <h1>Proveedores</h1> */}
                <ProductsModule/>
            </div>
        )
    
}
