/*
          find filter  中寻找匹配元素 ,当比较值为引用类型时候,不能找到
       
        const child ={ name: 'a', children: { name: 'a-child',children: { name: 'aa-child'}}}
        const arr = [{ name: 'a', children: { name: 'a-child',children: { name: 'aa-child'}}},{ name: 'b', children: { name: 'b-child'}}]
        let res = arr.find((item) => item.name == child.name)
        console.log(res)
       
         const child ={ name: 'a', children: { name: 'a-child',children: { name: 'aa-child'}}}
        const arr = [{ name: 'a', children: { name: 'a-child',children: { name: 'aa-child'}}},{ name: 'b', children: { name: 'b-child'}}]
        let res = arr.filter((item) => item === child)
        console.log(res)
        
        */
//    取消http请求的方法
//fetch
function request(req) {
  return fetch("url" + req.url, {
    signal: AbortController.signal,
  }).then(async (res) => ({ data: await res.json() }));
}
function cancelFetch() {
  AbortController.abort();
}
let cancelFnFetch = () => {};
function fetchRequest(req) {
  return new Promise((resolve, reject) => {
    fetch("url" + req.url, {
      signal: AbortController.signal,
    }).then(async (res) => resolve({ data: await res.json() }));
  });
  cancelFnFetch = function (msg) {
    reject({ message: msg });
  };
}
//XMLHttpRequest
let cancelXhr = () => {};
const xhr = new XMLHttpRequest();
function xhrRequest(arg) {
  return new Promise((resolve, reject) => {
    xhr.onload = function () {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        resolve({ data: xhr.responseText });
      } else {
        cancelXhr = function (msg) {
          // 用promise包装后的取消原生xhr方法
          reject(xhr.status + msg);
        };
        reject(xhr.status);
      }
    };
    xhr.open(arg.method || "get", "url" + arg.url, true);
    xhr.send(arg.data || null);
  });
}

// 如何取消一个超时的请求
let cancelRequest = () => {};
function requestFn(args) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success");
    }, 5000);
    cancelRequest = function () {
      reject("cancel");
      cancelRequest = null;
    };
  });
}
// axios 取消请求
// axios提供的方法
const axios = { request: function (args) {} };
let cancelFnAxios = () => {};
function requestAxios(args) {
  args.cancelToken = new cancelToken(function (cancel) {
    cancelFnAxios = cancel;
  });
  return axios.request(args);
}
let cancelFnAxios1 = () => {};
// promise包装的方法
function requestAxios1(args) {
  return new Promise((resolve, reject) => {
    axios.request(args).then((res) => resolve(res));
    cancelFnAxios1 = function (msg) {
      reject({ message: msg });
    };
  });
}
