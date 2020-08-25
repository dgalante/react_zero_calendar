import { baseRequest } from "./baseResquesAxios";

const server = process.env.REACT_APP_API_URL;

export const requesWithToken = ( endpoint, data, method = 'GET ') => {
    const token = localStorage.getItem('token') || '';

    const headers = {
        'x-token': token
    }

    return baseRequest(method, `${server}${endpoint}`, data, headers); 
}   

export const requestWithOutToken = ( endpoint, data, method = 'GET') => {
    return baseRequest(method, `${server}${endpoint}`, data);
}

