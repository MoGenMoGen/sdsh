<template>
  <div class="theme">
    <!-- 普法专题 -->
    <img :src="themeTitleImg" alt class="cursor" @click="toList('普法专题',{pid:'4688713356973056'})" />
    <swiper :options="swiperOptionTheme" class="swiper2" :style="{width:width+'px'}">
      <swiper-slide v-for="item in themeList" :key="item.id" class="swiper2Item">
        <div class="img" @click="toThemeDetail(item)">
          <img :src="item.fmImg" :style="{width:swiperW+'px',height:swiperH+'px'}" />
        </div>
        <p @click="toDetail(item)">{{item.title}}</p>
      </swiper-slide>

      <!--<div class="swiper-pagination" slot="pagination"></div>-->
      <div class="swiper-button-prev el-icon-arrow-left" slot="button-prev"></div>
      <div class="swiper-button-next el-icon-arrow-right" slot="button-next"></div>
    </swiper>
  </div>
</template>
<script>
  import themeTitleImg from './img/themeTitleImg.png'
    export default {
        props:['width','swiperW','swiperH'],
        data() {
            return {
              themeList:[],
              themeTitleImg,
              swiperOptionTheme: {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: 3,
                loop: true,
                loopFillGroupWithBlank: true,
                pagination: {
                  el: ".swiper-pagination",
                  clickable: true
                },
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev"
                }
              },
            };
        },
      // created(){
      //   this.pageNo = this.until.getQueryString('pageNo') ?  parseInt(this.until.getQueryString('pageNo')) : 1
      //   console.log(this.pageNo)
      // },
        mounted() {
            this.getThemeList()
        },
        components: {},
        computed:{
            widthLi(){
                return this.width*0.31
            }
        },
        watch: {

        },
        methods:{
        //专题
          async getThemeList(){
            let qry = this.query.new();
            this.query.toW(qry, "themeId", 1, "EQ");
            // this.query.toO(qry,'crtTm','desc')
            this.query.toP(qry, 1,20);
            let data = await this.api.themeList(encodeURIComponent(this.query.toJsonStr(qry)));
            this.themeList = data.data.list
          },
          //跳转到专题详情
          toThemeDetail(item){
            this.$router.push({
              path: "/topic",
              query: {
                id: item.id,
              }
            });
          },
        }
    };
</script>
<style lang="less" scoped>
  @base: 18rem;
  @import url("../assets/css/init.less");
  .theme{
    padding-top: 20px;
    .swiper2 {
      .swiper2Item {
        width: 22% !important;
        margin-left: 0.8%;
        margin-right: 0.8% !important;
        cursor: pointer;
        &:nth-of-type(4n + 1) {
          margin-left: 9%;
        }
        &:first-of-type {
          margin-left: 4.5%;
        }

        .img {
          width: 100%;
          display: flex;
          display: -webkit-flex;
          img {
            margin: auto;
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
          }
        }
        p {
          text-align: center;
          width: 100%;
          height: 40px;
          line-height: 40px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }

</style>
