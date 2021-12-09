```javascript
确保当前页面只有一个请求
const  axios = require('axios');
axios.intercetors.request.use(config => {
		let cancle
		if (cancle && typeof cancle === function) {
				cancle('cancle request')
		}
		config.cancleToken = new axios.cancleToken( c => {
			cancle = c
		})
	return config
})

axios.interceptor.response.use( 
    res => {
        cancle = null
        return res
    },err => {
			if (axios.isCancle(err)) { // 判断当前请求是否是主动取消请求的。
      return new Promise()
      }else {
      cancle = null;
      return Promise.reject(err)
      }
    }
)



```

