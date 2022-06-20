import axios from 'axios';

const baseURL = 'https://pizzacode-bd.herokuapp.com/api';
// const baseURL = 'http://localhost:8080/api';

const pizzaApi = axios.create({ baseURL });


export default pizzaApi;