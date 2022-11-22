## 观察元素是否出现在可见区域的方法
#### offsetTop scrollTop clientHeight
```js
 function isInViewArea(el){
            let viewHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            let elOffsetTop = el.offsetTop;
            let height = el.offsetHeight;
            let scrollTop = document.documentElement.scrollTop;
            if(elOffsetTop -scrollTop <= viewHeight  && scrollTop  < elOffsetTop + height) return true
            return false
        }
       const el = document.querySelector('.box');
       window.addEventListener('scroll',() => {
        // console.log(isInViewArea(el))
       })
```
#### IntersectionObserver
```js

       const options = {
         threshold: 1.0,
        // threshold: [0.0, 0.75]
        // root: document.body
       }
       const cb = (entries,observer) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting){
            entry.target.style.backgroundColor = 'pink'
          }
           
        })
       }
       const observer = new IntersectionObserver(cb,options);
       // 观察多个元素
       document.querySelectorAll('.container').forEach((el) => {
        observer.observe(el)
       })
        // 观察一个元素
        observer.observe(el)
```