import React, { useEffect } from 'react';
import {useAppContext} from '../context/AppContext'
import BrandsModule from '../modules/brands/BrandsModule';


export default function BrandsPage(props){
    const {setActualPage} = useAppContext();

    
    useEffect(() => {
        console.log('init brands page');
        setActualPage('Marcas');
        
    }, [])
        
        return (
            <div>
                {/* <h1>Proveedores</h1> */}
                <BrandsModule/>
            </div>
        )
    
}
