import qs from 'qs';
let baseURL = '';
let baseURLArr = [
  {
    type:'development',
    url: ''
  },
   {
    type:'test',
    url: ''
  },
   {
    type:'production',
    url: ''
  },
];
baseURLArr.forEach( item => {
  if (ProcessingInstruction.env.NODE_ENV === item.type) {
    baseURL = item.url
  }
});
export default function http( url, options = {}) {
  url = baseURL + url
  options.method = !options.method ? 'GET' : options.method
  if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(options.method)) {
    const joinText = url.includes('?') ? '&' : '?';
    url += `${joinText}${qs.stringify(params)}`;
        delete  options.params
         options = Object.assign({
          credentials : 'include',
          headers : {}
        },options)
        options.headers.Accept = 'application/json'
  }


  const token = localStorage.getItem('token');
  token && (options.headers.Authorization = token)
  // POST
  if (/^(POST|PUT)$/i.test(options.method)) {
    options.type = !options.type ? 'urlencoded': null
    if (options.type === 'urlencoded') {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      options.body = qs.stringify(options.body);
    }
    if (options.type === 'json') {
      options.headers['Content-Type'] = 'application/json';
      options.body = qs.stringify(options.body);
    }
  }
  return fetch(url,options).then (response => {
    // 只要有返回的结果状态,都会走这里
    if (/^(2|3)\d{2}$/.test(response.status)) {
      switch (response.status) {
        case 401:
          break;
        case 403: //服务器理解请求,但是拒绝执行 token 过期
          localStorage.removeItem('token')
          break;
        default:
          break;
      }
      return Promise.reject(response)
    }

  }).catch( error => {
    if (!window.navigator.onLine) {
      return
    }
    return Promise.reject(error);
  })


}
