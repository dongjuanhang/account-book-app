import axios from 'axios';
import { API_URL } from '@/global/const';
import commonUtil from '@/utils/common';
import cookie from '@/utils/cookies';

const http = axios.create({
    timeout: 20000,
    baseURL: API_URL,
    responseType: 'json',
    headers: {
        common: {
            Accept: '*/*',
        },
    },
});

http.interceptors.request.use(
    (config) => {
        config.headers.token = cookie.getCookie('token');
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

const requestHandle = (params: object) => {
    return new Promise((resolve, reject) => {
        http(params).then((res) => {
            resolve(res.data);
        }).catch((err: any) => {
            reject(err);
        });
    });
};

export default {
    post(url: string, params: any) {
        return requestHandle({
            method: 'post',
            url,
            data: params,
        });
    },
    get(url: string, params: any = null) {
        return requestHandle({
            method: 'get',
            url: commonUtil.queryString(url, params),
        });
    },
    delete(url: string, params: any = null) {
        return requestHandle({
            method: 'delete',
            url: commonUtil.queryString(url, params),
        });
    },
    put(url: string, params: any) {
        return requestHandle({
            method: 'put',
            url,
            data: params,
        });
    },
};
