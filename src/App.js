import './App.css';
import NavigationModule from "./modules/navigation/NavigationModule";
import React, { Component } from 'react'
import { AppProvider } from "./context/AppContext";

// const appData = {
//   actualPage: '/',
//   user: null
// }


export default class App extends Component {


  componentDidMount() {
    // console.log(appData);
  }

  render() {
    return (
      <>


        <AppProvider>
          <NavigationModule />
        </AppProvider>


      </>
    )
  }
}


// export default App;
