import Router from 'vue-router';
import Home from './home.vue';
Vue.use(Router);
export const authRoutes = [
    {
        path: '/cart',
        name: 'cart',
        component: () => () => import('./componenets/cart.vue'),
        children: [
            {
                path: 'cart-list',
                name: 'cartList',
                component: () => () => import('./componenets/cartlist.vue'),
                children: [
                    {
                        path: 'cart-cloth',
                        name: 'cartCloth',
                        component: () => () => import('./componenets/cartcloth.vue'),
                    }
                ]
            }
        ]
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => () => import('./componenets/cart.vue'),
        children: [
            {
                path: 'cart-list',
                name: 'cartList',
                component: () => () => import('./componenets/cartlist.vue'),
                children: [
                    {
                        path: 'cart-cloth',
                        name: 'cartCloth',
                        component: () => () => import('./componenets/cartcloth.vue'),
                    }
                ]
            }
        ]
    }
]
export default Router;