/**
 *  引入自定义的axios类，完成数据请求 的发送
 */
import axios from './axios';

axios.intercepter.request.use(function (config) {
    return config;
}, function () {
    console.log('err in axios intercepter request');
})
console.log(axios, '12121212');
axios.get('/', {
    baseUrl: "http://localhost:8888",
    headers: {
        'instance-header': 'give me a pow'
    }
    
})
    .then(res => {
    console.log( res,'client get server  data');
})