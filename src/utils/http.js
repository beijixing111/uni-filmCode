// 
import axios from 'axios';

import { API_HOST, API_TIME_OUT } from '@/config/http';

console.log('API_HOST', API_HOST);

const http = axios.create({
  baseURL: API_HOST,
  timeout: API_TIME_OUT
});

http.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
})

http.interceptors.response.use(response => {
  return response.data;
}, error => {
  return Promise.reject(error);
});

axios.defaults.adapter = function(config) {
  return new Promise((resolve, reject) => {
    const settle = require('axios/lib/core/settle');
    const buildURL = require('axios/lib/helpers/buildURL');
    uni.request({
      method: config.method.toUpperCase(),
      url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config
        }

        settle(resolve, reject, response);
      }
    })
  })
}

export default http;