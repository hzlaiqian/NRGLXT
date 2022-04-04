import axios from 'axios';
import { MessageBox, Message } from 'element-ui'
console.log(process.env.NODE_ENV)
let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
    baseUrl = '/nrglxt'
} else {
    baseUrl = 'http://47.96.18.55:8080/nrglxt'
}
const service = axios.create({
    baseURL: baseUrl
    // timeout: 5000,
    // http://47.96.18.55:8080/nrglxt
});

service.interceptors.request.use(
    config => {
        config.withCredentials = true;
        config.credentials = 'include';
        config.headers.accept = 'application/json';
        config.headers['Content-Type'] = 'application/json';
        config.mode = 'cors';
        config.cache = 'force-cache';

        // let token = localStorage.getItem("user_token");
        // if (token) {
        // 	config.headers.authorization = token
        // }


        if (config.method === 'POST') {
            config.data = JSON.stringify({
                ...config.data
            });
        }

        return config;
    },
    error => {
        console.error(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        console.log(response)
        const res = response.data
        if (res.code !== 200) {
            Message({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
);

export default service;
