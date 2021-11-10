<template>
  <div>
    <div id="adbox" ref="adbox" v-if="imgList.length>0" @mouseenter="enterbox" @mouseleave="leavebox">
      <img :src="imgList[0].imgUrl"  @click="toPage(imgList[0].locUrl)"/>
      <!--<b @click="closebox">×</b>-->
    </div>
  </div>
</template>
<style scoped>
  #adbox{

    position: absolute;
    z-index:999;
  }
  #adbox img{
    border: none;
    cursor: pointer;
    display: block;
  }
  #adbox b{
    position: absolute;
    right: 5px;
    top: 0;
    cursor: pointer;
    color:#666;
  }
</style>
<script>
  export default{
    props:['width'],
    data(){
      return {
        x:50,
        y:50,
        xin:true,
        yin:true,
        step:1.5,
        delay:25,
        itl:null,
        showAdbox:true,
        imgList:[]
      }
    },
     destroyed(){
      clearInterval(this.itl);
    },

    async mounted(){
      this.imgList = await this.api.getAdr('ADPOS.PC009')
      if(this.imgList.length>0){
        this.routeEnterShowAdbox()
      }
    },
    methods:{
      closebox(){
        this.showAdbox = false;
        clearInterval(this.itl)
      },
      leavebox(){
        if(this.showAdbox== false){
          clearInterval(this.itl)
        }else{
          this.itl=setInterval(this.movebox, this.delay)
        }
      },
      enterbox(){
        clearInterval(this.itl)
      },
      toPage(url){
        location.href = url
      },
      movebox() {
        var L = 0;
        var T = 0;
        var R = document.documentElement.clientWidth - this.$refs.adbox.offsetWidth;    //浏览器显示宽度-adbox宽度，不随滚动条变化而变化
        var B = document.documentElement.clientHeight - this.$refs.adbox.offsetHeight;  //浏览器显示高度-adbox高度，不随滚动条变化而变化
        this.$refs.adbox.style.left = this.x + document.documentElement.scrollLeft + "px";  //adbox初始左+滚动条最左端到浏览器最左端的距离
        this.$refs.adbox.style.top = this.y + document.documentElement.scrollTop + "px";    //adbox初始高+滚动条顶端到浏览器顶端的距离
        this.x = this.x + this.step * (this.xin ? 1 : -1);
        if (this.x < L) {this.xin = true;this.x = L;}
        if (this.x > R) {this.xin = false;this.x = R;}
        this.y = this.y + this.step * (this.yin ? 1 : -1);
        if (this.y < T) {this.yin = true;this.y = T;}
        if (this.y > B) {this.yin = false;this.y = B;}
      },
      routeEnterShowAdbox(){
        this.itl=setInterval(this.movebox, this.delay)
      },
    },
  }
</script>
