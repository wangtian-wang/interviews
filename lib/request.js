import axios from 'axios';
import Vue from 'vue';

switch (process.env.NODE_ENV) {
  case 'production':
    axios.defaults.baseURL = '';
    break;
  case 'text':
    axios.defaults.baseURL = '';
    break;
  case 'development':
    axios.defaults.baseURL = ''; //  ' /api/' 配置代理时候的基础域名
    break;
}
axios.defaults.timeout = 5000;
// 跨域的时候是否携带 token
axios.defaults.withCredentials = true;
// post 请求的参数转换  像这样name=123&sex=male
axios.defaults.headers['Content-Type'] = 'application/-x-www-from-urlencoded';

axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');
    // 处了登录请求外其他的请求都得携带 token
    if (config.url !== '/login') {
      token && (config.headers.Authorization = token);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 将服务器返回的状态码进行验证 一般成功的都走 response 失败的走 error
axios.defaults.validateStatus = (status) => {
  return /^(2|3)\d{2}$/.test(status);
};

axios.interceptors.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let { res } = error;
    // 当服务器返回错误的接货
    if (res) {
      switch (res.status) {
        case 401: // 没有权限
          break;
        case 403: // 服务器拒绝执行
          break;
        case 404: // 找不到页面
          break;
        default:
          break;
      }
    } else {
      // 服务器没有返回结果
      // 1 断网,做断网处理,可以跳转到断网页面
      if (!window.navigator.onLine) {
        return;
      }
      // 2 不知名的错误
      return Promise.reject(error);
    }
  }
);
Vue.prototype.$axios = axios;
export default axios;
