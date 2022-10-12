#### css模块化的方案

- #### 运行时

  - ##### BEM

    1. ##### 写法

       ```js
       .block__element--modifier 这种命名规范来实现的样式隔离，不同的组件有不同的 blockName，只要按照这个规范来写 CSS，是能保证样式不冲突的。
       ```

       

- #### 编译时

  - ##### css-module

    - ##### 写法

      ```js
      编译前
          <style module> 
          .guang {
              color: red; 
          } 
          </style>  
          <template>
              <p :class="$style.guang">hi</p>  
          </template>
      编译后
          <style module>
          ._1yZGjg0pYkMbaHPr4wT6P__1 { 
              color: red; 
          } 
          </style> 
          <template> 
              <p class="_1yZGjg0pYkMbaHPr4wT6P__1">hi</p> 
          </template>
      ```

      

    - ##### 原理

      ##### 需要配置css-loader. 通过修改选择器名称为全局唯一的方式,来实现css的样式隔离

      ##### css module 的实现需要需要配置css-loader, css-loader依赖postcss (css的编译工具 css中的babel),css-loader的package.json中有核心依赖包为postcss-modules-scope. 

      ```js
      :local(.continueButton) {
        color: green;
      }
      :export {
        continueButton: __buttons_continueButton_djd347adcxz9;
      }
      .__buttons_continueButton_djd347adcxz9 {
        color: green;
      }
      
      用:local()这样的伪选择器包裹的css选择器会做选择器名字的编译,并且把编译好的名字映射放到:export {}这个选择器下面.
      https://cloud.tencent.com/developer/article/2016204 参考文章链接
      ```

      

    - ##### 特点

      ##### 性能好,组件中直接使用$style.xx 使用该属性,用户有感知.

  - ##### css scoped

    - ##### 写法

      ```js
      编译前
          <div class="box">
           </div>
      
          <style scoped> 
            .box {
              color: '#ccc'
            }
          </style>
      编译后
          <div class="box" data-v-f2f4f5>
           </div>
      
          <style scoped> 
            .box[data-v-f2f4f5] {
              color: '#ccc'
            }
          </style>
      ```

      

    - ##### 原理

      ##### scoped 是vue-loader 支持的方案, 开箱即用. 通过编译的方式 在当前组件的元素上面 添加data-xx的属性,将元素的css选择器加上[data-xx]的属性,来实现css的样式隔离

    - ##### 特点

      - 给元素上面添加了属性,编译变得慢了

##### 

- #### css in js

  - ##### 原理	利用js的作用域来实现css隔离

  - ##### 写法

    ```js
    import styled from 'styled-components';
    
    const Wrapper = styled.div`
        font-size: 50px;
        color: red;
    `;
    
    function Guang {
        return (
            <div>
                <Wrapper>内部文件写法</Wrapper>
            </div>
        );
    }
    ```

    

