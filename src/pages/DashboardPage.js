import React, { Component } from 'react'
import AppContext from "../context/AppContext";

export default class DashboardPage extends Component {

    static contextType = AppContext

    constructor(props) {
        super(props);
        this.state = {
            val1: 'any'
        };
      }

    componentDidMount() {
    
        const { actualPage, setActualPage } = this.context;
        setActualPage('Dashboard');
          
    }

    render() {
        return (

            <>
                <h1>DashboardPage</h1>
            </>

        )
    }
}
