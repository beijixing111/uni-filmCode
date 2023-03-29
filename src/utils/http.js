// 
import axios from 'axios';

import { API_HOST, API_TIME_OUT } from '@/config/http';

// console.log('API_HOST', API_HOST);

const http = axios.create({
  baseURL: API_HOST,
  timeout: API_TIME_OUT
});

http.interceptors.request.use(config => {
  return config;
}, error => {
	console.log(error);
  return Promise.reject(error);
})

const networkErr = () => {
	uni.showToast({
		title: "网络异常，请稍后重试！",
		icon: 'none'
	});
}

http.interceptors.response.use(response => {
	console.log(response);
	if(response.data){
		return response.data;
	} else {
		networkErr();
		return {};
	}
}, error => {
	// console.log("http response", error);
	if(error.message === "Network Error"){
		networkErr();
	}
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