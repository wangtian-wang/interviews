const requestMapping = new Map();
const generateKey = (config) => {
  const { method, url, params, data } = config;
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join("&");
};
const addRequest = (config) => {
  const requestKey = generateKey(config);
  const hasReqKey = requestMapping.has(requestKey);
  let cal;
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancelReq) => {
      if (!hasReqKey) {
        cal = cancelReq;
      }
    });
  requestMapping.set(requestKey, cal);
};
const removeRequest = (config) => {
  const requestKey = generateKey(config);
  if (requestMapping.has(requestKey)) {
    const cancelToken = requestMapping.get(requestKey);
    cancelToken();
    requestMapping.delete(requestKey);
    return true;
  }
};

// 取消请求 应该在请求时候取消
axios.interceptors.request.use(
  (config) => {
    let res = removeRequest(config);
    addRequest(config);
    return res ? Promise.reject("当前请求已经发送过了") : config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // removeRequest(error.config || {});
    if (axios.isCancel(error)) {
      console.log(`已取消重复请求：${error.message}`);
    } else {
    }
    return Promise.reject(error);
  }
);

function handleRequest() {
  return axios({
    url: "http://localhost:8888/search",
    method: "get",
    params: {
      keywords: "hello",
    },
  }).catch((error) => {
    console.log(error);
  });
}
const btn = document.getElementById("btn");
const btn1 = document.getElementById("btn1");

btn.addEventListener("click", handleRequest, false);
btn1.addEventListener("click", handleRequest, false);
