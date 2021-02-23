import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context/AppContext';
import { NotificationProvider } from "./context/NotificationContext";
import { ClientsProvider } from "./context/ClientsContext";
import { SnackbarProvider } from 'notistack';
import { SuppliersProvider } from './context/SuppliersContext';


ReactDOM.render(
  // <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <AppProvider>
        <NotificationProvider>
          <ClientsProvider>
            <SuppliersProvider>
            <App />
            </SuppliersProvider>
          </ClientsProvider>
        </NotificationProvider>
      </AppProvider>
    </SnackbarProvider>,

  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
