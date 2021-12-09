const koa = require('koa');
const koaRouter = require('koa-router');
const app = new koa();
const router = new koaRouter();
app.use((ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
     next();
});
router.get('/',  ctx => {
    ctx.body = 'hello http server'
});
app.use(router.routes())
app.listen(8888, () => {
    console.warn('port is ready')
})