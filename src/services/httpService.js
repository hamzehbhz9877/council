import axios from "axios";
import {HideLoading, ShowLoading} from "../redux/actions/loading";

axios.defaults.baseURL = "http://94.183.8.213/api/v1/";


export const Intercept = ({dispatch}) => {
    axios.interceptors.request.use(function (config) {
        dispatch(ShowLoading());
        const token = localStorage.getItem("token");
        config.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    }, function (error) {
        dispatch(HideLoading());
        return Promise.reject(error);
    });

    axios.interceptors.response.use(res => {
        dispatch(HideLoading());
        return res
    }, error => {
        dispatch(HideLoading());

        if (error.response.status === 401) {
            window.location.replace("/login")
        }
        if (error.response.status === 403) {
            window.location.replace("/adminPanel/notfound")
        }
        if (error.response.status === 500) {
            //nothing happening here
        }
        return Promise.reject(error);
    });
};


