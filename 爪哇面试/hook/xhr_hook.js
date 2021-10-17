

class XHRHook {
  constructor(beforeHook = {}, afterHook = {}) {
    this.beforeHook = beforeHook;
    this.afterHook = afterHook;
    this.XMLHttp = window.XMLHttpRequest;
    this.init()
  }
  init () {
    let self = this;
    window.XMLHttpRequest = function () {
      self._XMLHttp = new self.XMLHttp();
      self.overWrite(self)
    }
    XMLHttpRequest()
  }
  overWrite (instance) {
    for (let key in instance._XMLHttp) {
      if (typeof instance._XMLHttp[key] === 'function') {
        this.rewriteMethods(key, instance)
        continue;
      }
      this.rewriteAttributes(key, instance)
    }
  }
  rewriteMethods (key, instance) {
    let beforeHook = this.beforeHook;
    let afterHook = this.afterHook;
    instance[key] = (...argus) => {
      if (beforeHook[key]) {
        const res = beforeHook[key].call(instance, ...argus);
        if (res === false) {
          return;
        }
        const result = instance._XMLHttp[key].apply(instance._XMLHttp, argus);
        afterHook[key] && afterHook[key].call(instance._XMLHttp, res)
        return result
      }
    }

  }
  rewriteAttributes (key, instance) {
    Object.defineProperty(instance, key, this.setProperty(key, instance._XMLHttp))
  }
  setProperty (key, instance) {
    let obj = Object.create(null);
    let self = this;
    obj.set = function (val) {
      if (!key.startsWith('on')) {
        instance['-' + key] = val;
        return;
      }
      if (self.beforeHook[key]) {
        this._XMLHttp[key] = function (...argus) {
          self.beforeHook[key].call(instance);
          val.apply(instance, argus)
        }
        return;
      }
      self._XMLHttp[key] = val

    }
    obj.get = function () {
      return instance['-' + key] || this._XMLHttp[key]
    }
    return obj;
  }

}
new XHRHook({
  open: function () {
    console.log('open')
  },
  onreadystatechange: function () {
    console.log('next')
  }
}, {
  close: function () {
    console.log('close')
  }
})
