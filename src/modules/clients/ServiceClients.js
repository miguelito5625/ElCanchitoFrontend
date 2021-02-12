import axios from 'axios';


export default class ServiceClients {

    backendURL = process.env.REACT_APP_BACKEND_SERVER;

    createNewClient(client) {
        return axios.post(`${this.backendURL}/clients`, client);
    }

}
