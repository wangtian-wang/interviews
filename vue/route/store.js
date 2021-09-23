/** store 里面获取从后端返回的权限列表 前端自己根据权限列表去生成路由的表 */
/** 后端返回的menulist如下 
menulist = [
    {
        pid: -1,
        name: 'shopingcar',
        id: 1,
        auth: 'cart'
    },
    {
        pid: 1,
        name: 'shopingcarlist',
        id: 2,
        auth: 'cart-list'
    }
]
*/
import {authRoutes} from './routelist'
const formatRouteList = (authRoutes, auth) => {
  return  authRoutes.filter(item => {
      if (auth.includes(item.name)) {
        if (item.children && item.children.length > 0) {
           item.children =  formatRouteList(item.children, auth)
        }
          return true
       }
    })
}
const getTreeList = (menulist) => {
    let menu = [], routeMap = {};
    menulist.forEach(elem => {
        elem.children = [];
        routeMap[elem.id] = elem;
        if (menulist.pid == -1) {
            menu.push(elem)
        } else {
            let fatherMenu = routeMap[elem.pid];
            if (fatherMenu) {
                fatherMenu.push(elem)
            }
        }
    })
}
export default new Vuex.store({
    state: {
        hasPermission: false,
        menuList: [],
        btnPermission: {'edit' : true, "delete" : false}
    },
    mutations: {
        setMenuList (state, menulist) {
            state.menulist = menulist;
        },
        setPermission (state) {
            state.hasPermission = true;
        }
    },
    actions: {
        async getMenuAuth ({ commit, dispatch }) {
        /** 1 请求后端数据，返回角色权限  2： 将角色权限和前端的路由做一个整合 形成路由权限隐射表 */
            let { menulist } = await axios.get('/roleAuth');
            let { auth, menu } = getTreeList(menulist);
            commit('setMenuList', menu);
            let routeList = formatRouteList(authRoutes, auth);
            commit('setPermission');
            return routeList;
        }
    }
})