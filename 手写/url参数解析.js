let url = "http://www.zhufengpeixun.cn/?lx=1&name=js#video";
/*
 使用split拆分为数组时  需要考虑 ?  # 出现的位置
 */

Object.defineProperty(String.prototype, "queryUrlParams", {
  value: function queryUrlParams(attr) {
    let obj = {},
      self = this;
    self.replace(/#([^?&=#]+)/g, (_, $1) => (obj["Hash"] = $1));
    self.replace(/([^?&=#]+)=([^?&=#]+)/g, (_, $1, $2) => (obj[$1] = $2));
    return attr ? obj[attr] : obj;
  },
});
console.log(url.queryUrlParams());
