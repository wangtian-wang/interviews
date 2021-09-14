/**
    template: 
          {{getCounter()}}
    data(){
        return {
            counter: 0
        }
    }
    methods: {
        getCounter(){
            return this.counter  当counter发生变化的时候  对应的副作用函数会执行
        }
    }
 */
