### vue-install

### Vue.component()

### Vue.use()





```javascript
main.js 
 引入 dialog 组件
 			import dialog from‘'@/dialog/index.vue';
 vue.use(dialog)
			全局注册组件
dialog(组件)
	src: {
    index.vue{
      
    },
    index.js {
      ```
				import dialog from './dialog';
				dialog.install = (vue) => {
					vue.component(dialog.name, dialog)
					}
				export default dialog
			```
    }
  }
```

