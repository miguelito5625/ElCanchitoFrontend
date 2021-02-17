import React, { useState, useMemo } from 'react'

const ClientsContext = React.createContext();

export function ClientsProvider(props) {
    const [clientsRepo, setClientsRepo] = useState(null);
    const [clientInForm, setClientInForm] = useState(
        {
            "cui": "",
            "name1": "",
            "name2": "",
            "last_name1": "",
            "last_name2": "",
            "birth_date": "",
            "phone": "",
            "email": "",
            "country": "",
            "departament": "",
            "municipality": "",
            "street": "",
            "reference": "",
            "zip_code": ""
        }
    );

    

    const value = useMemo(() => {
        return({
            clientsRepo,
            setClientsRepo,
            clientInForm, 
            setClientInForm,
        })
    }, [clientsRepo]);

    return <ClientsContext.Provider value={value} {...props}/>
}

export function useClientsContext(){
    const context = React.useContext(ClientsContext);
    if (!context) {
        throw new Error('useClientsContext debe estar dentro del proveedor ClientsContext');
    }
    return context;
}