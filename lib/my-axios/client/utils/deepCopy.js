export const deepClone = function (obj) {
    let target = Array.isArray(obj) ? [] : {};
   
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                target[key] = deepClone(obj[key]);
            } else {
                target[key] = obj[key]
            }
                
        };
    }
   
    return target;
}
export const mergeConfig = function (baseConfig,instanceConfig) {
    let baseConf = deepClone(baseConfig);
    let instanceConf = deepClone(instanceConfig);
    Object.keys(instanceConf).reduce((prev, key) => {
        // 将某些基础的配置合并
        if (['headers'].includes(key)) {
            prev[key] = Object.assign(baseConf[key],instanceConf[key])
        }
        // 将某些基础的配置覆盖
        if (['url', 'baseUrl', 'method'].includes(key)) {
            prev[key] = instanceConf[key]
        }
        return prev;
    },baseConf)
    return baseConf;
 }