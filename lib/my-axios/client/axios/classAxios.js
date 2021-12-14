import { deepClone ,mergeConfig} from '../utils/deepCopy';
import Intercepter from './intercepter';
class Axios {
    constructor(config){
        this.defaultsConfigs = deepClone(config);
        this.intercepter = {
            request: new Intercepter(),
            response: new Intercepter()
        }
    }
  
    get (url, config) {
    /*
         将get传入的参数config和实例化对象的时候传入的config进行整合
        
    */  
   let assginConfigs = mergeConfig(this.defaultsConfigs, config);
   config.url = url;
    /**
     *  issue ： 啥时候调用use方法；
     *           调用use方法存在哪些问题
     *           为啥要使用promise去调用
     * 
     *  
     */
        let promise = Promise.resolve(assginConfigs);
    /** 请求拦截器 */
    this.intercepter.request.handlers.forEach(handler => {
        promise = promise.then(handler.resHandler,handler.rejHandler)
    })
    // promise.resolve成功的函数立即执行 将参数assginConfigs 传递给promise.then里面成功的回调函数request；
    // request 返回一个promise对象， 方便后续继续使用get方法的时候可以.then方法；
    // promise.then 总是找上一个距离自己最近的promise对象去执行里面的res, rej方法
    // 
    /** 发送请求的方法 */
    promise = promise.then(this.request, undefined)
    /** 响应拦截器 */
    this.intercepter.response.handlers.forEach(handler => {
        promise = promise.then(handler.resHandler,handler.rejHandler)
    })    
    return promise;
      
    }
    request (config) {
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.response) {
                    let obj = {
                        statusCode: xhr.statusCode,
                        statusText: xhr.statusText,
                        data: xhr.responseText
                    }
                    res(obj)
                } else {
                    rej()
                }
                
            };
            xhr.open('get', config.baseUrl + config.url, true);
            xhr.send();
            })
    }
}

export default Axios;