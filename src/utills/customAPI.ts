import axios from 'axios';

const API = axios.create({
	baseURL: process.env.REACT_APP_SERVER_API,
	headers: {
		Accept: 'application/json',
	},
});

export default API;
