自定义可以按需引入的组件;

/*组件的文件结构、
  dialog-comp
    index.js
            import comp from './dialog-comp';
            const install = (Vue）=> {
              if (install.installed) {
                return;
              }
              install.installed = true;

              Vue.component(Item.name, Item);
             }
           export default {
            install
           }; 
           关于这个install文件，这个文件是给组件提供注册的install函数， 当执行Vue.use（dialog-comp）的时候，执行的是这个函数
    main.vue
            主体的组件文件
    
    当这个库的名字叫做lib的时候， 使用这个库需要用的方法是Vue.use(lib);
       这个库也需要作为一个插件，提供install方法。
       而且这个install方法里面可以执行的事情很多，具体参考官网， 但是这个Vue.use()方法，必须在实例化vue之前执行。
       const install = function(Vue) {
  if (install.installed) {
    return;
  }
  install.installed = true;

  components.map(item => {
    Vue.component(item.name, item);
  });

  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
  });

  Vue.directive('draggable', draggable);
  Vue.directive('dialogDrag', dialogDrag);
  Vue.directive('dialogDragWidth', dialogDragWidth);
  Vue.directive('scroll', scroll);

};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
  // ...components
};


*/
export function createRouter(options) {
  const router = {
    install(app) {
      const RouterLink = {
        template: "",
      };
      const RouterView = {
        template: "",
        data() {},
      };
      const route = [];
      app.component("router-link", RouterLink);
      app.component("router-view", RouterView);
    },
  };
  const routerHistory = options.history;
  let compo = null,
    compo1 = null;
  window.addEventListener(
    "hashchange",
    (e) => {
      compo = () => import(`view/${e.path}.vue`);
    },
    false
  );
  window.addEventListener(
    "popstate",
    (e) => {
      compo1 = () => import(`view/${e.path}.vue`);
    },
    false
  );
  return router;
}
