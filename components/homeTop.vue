<style lang="less" scoped>
    @import url("../assets/css/init.less");
    .homeTop{
      width: 100%;
      background: url("./img/bg.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center top;
      overflow: hidden;
      height: 879px;
      .videoSwiper{
        height: 478px;
        width: 850px;
        margin: 190px auto 25px;
        border: 2px solid #fe0100;
      }
      .gallery-thumbs{
        width: 850px;
        margin: 0 auto;
      }
      .gallery-thumbs .swiper-slide {
        /*width: 25%;*/
        /*height: 100%;*/
        /*opacity: 0.4;*/
        img{
          width: 100%;
          height: 100px;
        }
      }
      .swiperNm{
        text-align: center;
        line-height: 30px;
      }
      .gallery-thumbs .swiper-slide-active {
        opacity: 1;
      }
      .swiper2{
        width: 850px;
        height: 160px;
        margin: 0 auto;
        .swiper2Item{
          cursor: pointer;
        }
        .el-icon-arrow-left:before,.el-icon-arrow-right:before{
          content: '';
        }
      }
    }
</style>
<style lang="less">
#thumbsHome .swiper-wrapper{
  transform: none!important;
  .swiper-slide{
    cursor: pointer;
  }
}
</style>

<template>
  <div class="homeTop" :style="{width:bWidth+'px'}">
    <div class="videoSwiper">
      <el-carousel height="478px" :autoplay="false" @change="changeVideo">
        <el-carousel-item v-for="item in videoList" :key="item.id" >
          <video :src="item.locUrl" controls="controls" :poster="item.imgUrl" style="width: 100%" class="movie">
            您的浏览器不支持 video 标签。
          </video>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- swiper2 Thumbs -->
    <swiper :options="swiperOptionThumbsHome" class="swiper2">
      <swiper-slide v-for="item in list" :key="item.id" class="swiper2Item">
        <div class="img" @click="toDetail(item.id)" :href="'/zjfzol/newList?detailId='+item.id" >
          <img :src="item.imgUrl" style="width:202.5px;height:115px" />
        </div>
        <p @click="toDetail(item.id)" :href="'/zjfzol/newList?detailId='+item.id" >{{item.nm}}</p>
      </swiper-slide>

      <!--<div class="swiper-pagination" slot="pagination"></div>-->
      <div class="swiper-button-prev el-icon-arrow-left" slot="button-prev"></div>
      <div class="swiper-button-next el-icon-arrow-right" slot="button-next"></div>
    </swiper>

  </div>
</template>

<script>
 import arrow from './img/arow.png'
  export default {
    props: ['bWidth'],
    data() {
      return {
        arrow,
        videoList:[],
        list:[],
        swiperOptionTopHome: {
          autoplay:true,
          /*autoplay: {
   delay: 3000,
   stopOnLastSlide: false,
   disableOnInteraction: true,
   },*/
          autoHeight: true,
          spaceBetween: 10,
          // loop: true,
          // loopedSlides: 5, //looped slides should be the same

        },
        swiperOptionThumbsHome: {
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          },

          spaceBetween: 10,
          // centeredSlides: true,
          touchRatio: 0.2,
          slideToClickedSlide: true,
          slidesPerView: 4,

        },
      }
    },
    components:{},
    mounted() {
      this.getVideo()
      this.getList()
    },
    computed: {

    },
    methods: {
      //幻灯片切换
      //幻灯片切换
      changeVideo(index,oldIndex){
        console.log(index)
        console.log(oldIndex)
        var video = document.getElementsByClassName('movie')[oldIndex];
        if(!video.paused){ //如果已暂停则播放
          video.pause(); //暂停控制
        }

      },
      toDetail(id){
        this.$router.push({
          path: "/newList",
          query: {
            detailId: id,
            time:new Date().getTime()
          }
        });
      },
      async getList(){
        let param = {
          catId:'4690112235410432',
          siteId:1,
          pageNo:1,
          pageSize:20
        }
        let data = await this.api.getAllList(param);
        this.list = data.data.list;
      },
      async getVideo(){
        this.videoList = await this.api.getAdr('NNSXPY')
        // this.$nextTick(()=>{
        //   console.log(this.$refs)
        //   const swiperTop = this.$refs.swiperTopHome.swiper
        //   const swiperThumbs = this.$refs.swiperThumbsHome.swiper
        //   swiperTop.controller.control = swiperThumbs
        //   swiperThumbs.controller.control = swiperTop
        // })
      },
    }
  }
</script>
