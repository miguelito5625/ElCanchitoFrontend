import React, { Component } from 'react'

const AppContext = React.createContext()

class AppProvider extends Component {
  // Context state
  state = {
    user: {},
    actualPage: 'Dashboard'
  }

  // Method to update state
  setUser = (user) => {
    this.setState((prevState) => ({ user }))
  }

  // Method to update state
  setActualPage = (actualPage) => {
    this.setState((prevState) => ({ actualPage }))
  }

  render() {
    const { children } = this.props
    const { user } = this.state
    const { actualPage } = this.state
    const { setUser } = this
    const { setActualPage } = this

    return (
      <AppContext.Provider
        value={{
          user,
          setUser,
          actualPage,
          setActualPage,
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
}

export default AppContext

export { AppProvider }