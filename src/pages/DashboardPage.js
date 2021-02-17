import React, { useEffect } from 'react'
import {useAppContext} from "../context/AppContext";

export default function DashboardPage () {

    
    const { setActualPage } = useAppContext();

    useEffect(() => {
        console.log('init dashboard page');
        setActualPage('Dashboard');
    }, [])
    
    return (

        <>
            <h1>DashboardPage</h1>
        </>

    )
}
