import './App.css';
import NavigationModule from "./modules/navigation/NavigationModule";
import React, { Component } from 'react'
import ElCanchitoSnackbars from './modules/notifications/ElCanchitoSnackbars';

export default class App extends Component {

  backendURL = process.env.REACT_APP_BACKEND_SERVER;


  componentDidMount(){
    console.log('El backend es: ', this.backendURL);
  }

  render() {
    return (
      <>
          <NavigationModule />
          <ElCanchitoSnackbars/>

      </>
    )
  }
}