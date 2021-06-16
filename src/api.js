import { setup } from 'axios-cache-adapter'
import Cookies from 'js-cookie';
import { fatal_error } from './state/slices/errors/errors';

const api = setup({
    baseURL: "https://fansthetic.com/api/v1/",
    timeout: 10000,
    // auth: {
    //     username: 'hinata',
    //     password: 'ilovenaruto'
    // },
    headers: {
        "accept": "application/json",
        "Content-Type": "application/json" ,
        "Authorization": Cookies.get('Authorization')
    },

    // `axios-cache-adapter` options
    cache: {
        maxAge: 15 * 60 * 1000,
        exclude: { 
            query: false, 
            paths: [
                /\/products\/cart/
            ],
        }
    },

    jar: true
})

api.interceptors.request.use( config => {
    console.log("Authorization - ", document.cookie);
    config.headers['Authorization'] = Cookies.get("Authorization");
    return config;
}, error => {
    fatal_error("couldn't attach/remove auth credentials to request", error);
} )

export default api;