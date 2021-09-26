// 检测是否为PC端浏览器;
function isPCBroswer() {
    let e = window.navigator.userAgent.toLowerCase(),
      t = "ipad" == e.match(/ipad/i),
      i = "iphone" == e.match(/iphone/i),
      r = "midp" == e.match(/midp/i),
      n = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i),
      a = "ucweb" == e.match(/ucweb/i),
      o = "android" == e.match(/android/i),
      s = "windows ce" == e.match(/windows ce/i),
      l = "windows mobile" == e.match(/windows mobile/i);
    return !(t || i || r || n || a || o || s || l);
  }
  // 识别浏览器及平台
  function getPlatformInfo() {
    //运行环境是浏览器
    let inBrowser = typeof window !== "undefined";
    //运行环境是微信
    let inWeex = typeof WXEnvironment !== "undefined" && !!WXEnvironment.platform;
    let weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
    //浏览器 UA 判断
    let UA = inBrowser && window.navigator.userAgent.toLowerCase();
    if (UA) {
      let platforms = {
        IE: /msie|trident/.test(UA),
        IE9: UA.indexOf("msie 9.0") > 0,
        Edge: UA.indexOf("edge/") > 0,
        Android: UA.indexOf("android") > 0 || weexPlatform === "android",
        IOS: /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === "ios",
        Chrome: /chrome\/\d+/.test(UA) && !(UA.indexOf("edge/") > 0),
      };
      for (const key in platforms) {
        if (platforms.hasOwnProperty(key)) {
          if (platforms[key]) return key;
        }
      }
    }
  }
  