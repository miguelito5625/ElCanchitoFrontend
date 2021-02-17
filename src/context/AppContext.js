import React, { useState, useMemo } from 'react'

const AppContext = React.createContext();

export function AppProvider(props) {

  const [userLogged, setUserLogged] = useState(null);
  const [actualPage, setActualPage] = useState('Dashboard');
  
    const value = useMemo(() => {
        return({
          userLogged, 
          setUserLogged,
          actualPage, 
          setActualPage,
        })
    }, [actualPage, userLogged]);

    return <AppContext.Provider value={value} {...props}/>
}

export function useAppContext(){
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext debe estar dentro del proveedor AppContext');
    }
    return context;
}