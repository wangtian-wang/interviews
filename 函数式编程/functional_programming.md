###  Defination

###### 	Functional programming is the process of building software by composing pure functions,avoiding shared state, mutable data, and side-effects. Functional programming is declarative, and applocation <font color="orange">state flows through pure function</font>

将数据从一个纯函数传递到另外一个纯函数

函数式编程范式 使用组合函数,将纯函数结合起来,完成某个功能

### Properties

- Avoid side effect

  ###### what's side effects?

  - Changing a value globally(var, property, or data structure)
  - changing the original value of the functions arguments
  - Throwing an exception
  - Triggering an external process
  - Invoking other functions that have side-effects.

- Avoid Mutations

- Avoid Shared State

  ###### What's state ?

  ​     a program is considered stateful if it is designed to remember data from events or user interactions. The remembered information is called the state of program.

  ​     data that stored in a program is the state of the program.

  What's share state ?

     	shared state is any variable, object, or memory space that exists in a shared scope, or as the property of an object being passed between scopes. a shared scope can include global scoped or closure.

  

- Use Pure Functions

- Use  Function Composition

- Use Declarative Code

### Functions in Functional Programming

- Functions have an input 
- Function return a value
- Function are simplified to a single task

### Difference  between Procedures and Functions

- a procedure is a collection of functionality it may have input or not , may have return value or not

### Advantages of Functional programming

- 使的程序的代码易于理解;便于维护;运行的结果可以预测

### Partical Function and Curried Function

###### Partical 

  it's a function which has some arguments fixed inside it's closure scope, and return a function that takes the remain arguemnts.

将给定的函数的部分<font color="red">参数固定化</font>(提前传入函数内部,函数的参数,被返回的闭包函数使用)返回个新函数 接收剩余的参数

###### curried

 Expects multiple arguments is broken down into broken down into successive functions that each take a single argument and return another function to accept the next argument.

函数的多个参数被分解为<font color="red">连续的函数调用</font>,每个函数只接收一个参数,并返回另外一个函数来接收下一个参数.

###### Advantages of curring

- Curring can be used to specialize functions
- curring simplifies function composition.

###### 科里化函数 是 偏函数的一种

###  Declarative Programming

###### Declarative programming expresses the logic of a program without identifying the control flow. Control flow is abstracted away, so declarative code only needs to specify what to do.

声明式编程特点: 

​	1: 函数内部没有 for if while语句等, reduce filter等是函数式编程的体现

​	2: 把大的任务拆解为几个小的任务(函数)来处理,使用更加具体的动词为小函数命名,可以通过读函数的名字去理解该函数功能,最后重新组合这些函数 来实现最初的功能.

满足怎样的条件才算是函数式编程 概念 特点

函数式编程应用

​    纯函数, 科里化函数,compose函数 pipe函数...

函数式编程的状态指的是啥?

函数的突变性指的是啥,如何避免?

