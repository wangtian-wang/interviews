 同一次加载中  相同的URL 浏览器只会发出同一次 http请求
 <template>
   <div>
       <div v-for="(item, index) in imgList" :key="index">
           <img :src=" `/image/${id.id}.jpg`"  v-if="index < alreadyLoadImgCount"   alt="">
       </div>
   </div>
 </template>
 
 <script>
 export default {
  data(){
      return {
          imgList: [],
          alreadyLoadImgCount: 0
      }
  },
  created(){
      let { data} = await axios.get('/imhlist');
      this.imgList = data;
      this.generatorImg(this.imgList[0].id)
  },
  methods: {
      generatorImg(id){
          if(id >= this.imgList.length) return;
          let img =new Image();
          img.src = '/Image/' + id + '.jpg';
          let self = this;
          img.onload = () => {
              self.alreadyLoadImgCount++;
              this.generatorImg(++id);
          }

      }
  }
 }
 </script>
 
 <style>
 
 </style>