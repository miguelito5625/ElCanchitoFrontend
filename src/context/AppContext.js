import React, { Component } from 'react'

const AppContext = React.createContext()

class AppProvider extends Component {
  // Context state
  state = {
    user: null,
    actualPage: 'Dashboard',
    openSnackbars: true,
  }

  // Method to update state
  setUser = (user) => {
    this.setState((prevState) => ({ user }));
    this.setState({
      user
    });
  }

  // Method to update state
  setActualPage = (actualPage) => {
    this.setState({
      actualPage
    });
  }

  // Method to update state
  setSnackbar = (open) => {
    this.setState({
      openSnackbars:open
    });
  }

  render() {
    const { children } = this.props
    const { user } = this.state
    const { actualPage } = this.state
    const { openSnackbars } = this.state
    const { setUser } = this
    const { setActualPage } = this
    const { setSnackbar } = this

    return (
      <AppContext.Provider
        value={{
          user,
          setUser,
          actualPage,
          setActualPage,
          openSnackbars,
          setSnackbar,
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
}

export default AppContext

export { AppProvider }