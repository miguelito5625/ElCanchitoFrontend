import React, { useState, useEffect, useMemo } from 'react'

const NotificationContext = React.createContext();

export function NotificationProvider(props) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [durationSnackbar, setDurationSnackbar] = useState(1200);
    const [messageSnackbar, setMesaageSnackbar] = useState('');
    const [severitySnackbar, setSeveritySnackbar] = useState('info');

    const createNotification = (message, severity, duration) => {
        setMesaageSnackbar(message);
        setDurationSnackbar(duration);
        setSeveritySnackbar(severity);
        setOpenSnackbar(true);
    }

    const value = useMemo(() => {
        return({
            openSnackbar,
            severitySnackbar,
            durationSnackbar,
            messageSnackbar,
            setOpenSnackbar,
            setSeveritySnackbar,
            setDurationSnackbar,
            setMesaageSnackbar,
            createNotification,
        })
    }, [openSnackbar]);

    return <NotificationContext.Provider value={value} {...props}/>
}

export function useNotificationContext(){
    const context = React.useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotificationContext debe estar dentro del proveedor NotificationContext');
    }
    return context;
}