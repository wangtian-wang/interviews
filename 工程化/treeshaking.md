#### tree shaking 的作用
- 去除无用代码，缩小最终的包体积
##### 为啥依赖ES6 module
- es6module的特点
    - 只能作为模块的顶层语句出现
    - import的模块名称只能是字符串常量
    - import之后 是不可能修改的
    > 模块关系是确定的 可以进行可靠的静态分析
#### webpack的 tree-shaking
-  使用`sideEffects` 标记那些文件是'pure' ,可以安全删除文件中未使用的代码.
- webpack在编译的过程中,会根据模块的import和 export 依赖分析对代码块进行标记
    - 未使用的模块, 在代码块前增加 unused harmony exports 注释标记
    - 已经使用的模块  harmony export 
#### rollup的tree-shaking
- 它支持程序流分析，能更加正确的判断项目本身的代码是否有副作用
    - 从入口文件开始,组织依赖关系,按照文件生成module
    - 生成抽象语法树.建立语句间的关联关系.
    - 为每个节点标记是否被使用
    - 生成代码 去除无用代码