/**
 * 1: 实现一个动态路由的步骤
        前端:
            1: 发送登录请求, 获取用户权限
            2: 根据用户权限, 动态生成路由
            3: 根据路由, 生成侧边栏菜单
        后端:
            1: 根据用户名称,获取对应权限
            2: 根据用户权限,查询对应的权限路由
            3: 鉴权,将该路由返回前端

    2: 前后端数据结构:
        前端: 
            根据后端返回的权限数据,格式化为树形结构路由数据
            generateRoute()
        后端: 
            用户表
              {id: 1, name: 'xiaoming',auth: [2,3,4,5]}
            路由表
            [
            {id: 2,pid: 0, path: '/course',name: 'course',title: '课程管理'}, 1级菜单
            {id: 3,pid: 2, path: 'add',name: 'addCourse',link: '/course/add',title: '课程管理'} 子菜单
            ]
 * 2: 假设要我来设计一个动态路由 我该考虑那些因素
 * 3: 之前实现过的路由结构 有哪些点 没有搞懂
 *
 *  后台管理系统
 *用户iD: xiaoming, auth: [1,3,5,6]  router: [{id: 1,name: course,title: '课程管理'}]


   权限修改: 
        登录后获取权限  (不变)  将用户ID保存起来  (变化) 每次刷新页面需要根据用户ID(角色)去重新请求对应的角色路由   重新动态生成路由
        只要当前的用户ID是登录状态 那该用户权限对应的路由不应该发生变化
        更改了权限后 需要退出重新登录,根据用户ID, 后台查询该ID对应的新权限,返回对应路由 否则会有安全问题
 */
function generateRoute(routes) {
  let userRoutes = routes.map((r) => {
    let route = {
      name: r.name,
      path: r.path,
      component: () => import(`@/views/${r.name}.vue`),
    };
    if (r.children) {
      route.children = generateRoute(r.children);
    }
    return route;
  });
}
