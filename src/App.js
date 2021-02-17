import './App.css';
import NavigationModule from "./modules/navigation/NavigationModule";
import React, { Component } from 'react'
import ElCanchitoSnackbars from './modules/notifications/ElCanchitoSnackbars';

export default class App extends Component {

  render() {
    return (
      <>
          <NavigationModule />
          <ElCanchitoSnackbars/>

      </>
    )
  }
}