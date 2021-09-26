## cookie的分类
    * 会话cookie 默认
         *  
    * 硬盘cookie 
         * 
## cookie的生命周期
    * expire :格式： Date.toUTCSting() expires=data-in-GMTString-format; (格林威治时间)  在某个具体的时间过时
    * max-age:格式： max-age=1000 单位 毫秒                                              一段时间


## cookie的作用域
#### Domain
    * 指定哪些主机可以接受cookie
    * 指定：
        * 包含子域名 如设置Domain=mozalia.org 则cookie也会包含在子域名（developer.mozalia.org). 
            * 子域名发送的请求也会携带和主域名相同的cookie？
    * 不指定： 
        * 默认是origin，不包括子域名 
#### Path
    * 指定主机下哪些路径可以接受cookie
        * 如 设置Path=/docs 只要地址里面包含/docs都会匹配     
## cookie + session被淘汰的原因
    * 1： size： 4kb;
    * 2:  明文传输， 不安全；
    * 3:  携带在HTTP的请求头中，增加了流量；
    * 4:分布式架构和服务器集群中，正确的识别session是一个重要的事情；
    * 5:浏览器会自动将cookie设置到本地的cookie中存储起来，但是除了浏览器之外必须的手动设置；
## koa-session
    * demo  use koa-session in koa
     
    ``` 
            const  Session = require('koa-session');
            const session = Session({
                key:'sessionid',
                maxAge: 10 * 1000,
                signed: true // 使用签名算法 安全 本地的session里面会多出一个加密的session sid
            }, app)
            app.use(session)
            router.get('/',(ctx,next) => {
                const { id, name} = ctx.req;
                ctx.session.user = {id, name} 设置了一个key为user 值为{id, name}的session 浏览器会自动将这个session存储起来
            })







    ```