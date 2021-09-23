import router from './routelist';
import store from './store';
router.beforeEach((to, from, next) => {
    if (!store.state.hasPermission) {
        let dynamicRoutes = await store.dispatch('getMenuAuth');
        router.addRoutes(dynamicRoutes);
    /**因为是一步获取数据之后 处理成路由列表所以在访问的时候可能暂时会没有这个路由所以需要下面的操作 */
        /** replace 不产生历史记录 */
        next({...to,replace:true}) 
    }
})