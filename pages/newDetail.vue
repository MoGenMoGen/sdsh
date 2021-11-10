<template>
<!--  新闻详情页面-->
  <div id="detail">

    <questionnaire v-if="questionnaireShow" :list="questionnaireList" :showVotes="info.showVotes" @questionnaireClose="questionnaireClose"></questionnaire>
    <div class="shareWx" v-if="share"  @click="share=false">
      <i class="el-icon-close" ></i>
      <div @click.stop="qrClick">
        <vue-qr :text="url" qid="testid"></vue-qr>
      </div>
    </div>
    <div class="top">
      <h1>{{info.title}}</h1>
      <h5 v-if="info.subhead">{{info.subhead}}</h5>
      <p><span>{{info.releTm}}</span><span> 作者：{{info.author}}</span>  <span>{{info.newsSrc}}</span></p>
      <span @click="close">返回 ></span>
      <div class="share">
        <img :src="wechat" @click="share=true" />
        <img :src="sian" @click="shareSian" />
      </div>
    </div>
<!--    iframe盒子-->
    <!--图集-->
    <div class="imgNews" v-if="info.type==2">

        <!-- swiper1 -->
        <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
          <swiper-slide :class="'slide-'+index+1" class="imgNewsSwiper" v-for="(item,index) in imgList" :key="index">
            <p>{{index+1}}/{{imgList.length}}</p>
            <img :src="item.url"/>
          </swiper-slide>

          <div class="swiper-button-next " slot="button-next">
          </div>
          <div class="swiper-button-prev " slot="button-prev"></div>
        </swiper>
      <div class="detailMain" v-html="info.cont" v-if="info.cont"></div>
      <!-- swiper2 Thumbs -->
      <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs" :style="{height:(width/4-10)*244/430+'px'}">
        <swiper-slide :class="'slide-'+index+1" v-for="(item,index) in imgList" :key="index">
          <img :src="item.url" :style="{width:width/4-10+'px',height:(width/4-10)*244/430+'px'}"/>
        </swiper-slide>
      </swiper>
    </div>
    <!--全景-->
    <div class="quanjing-detail" v-if="info.type==5">
      <iframe :src="info.linkUrl"></iframe>
       <p  @click="openQuanjing(info)">全屏播放</p>
    </div>
    <!--视频-->
    <div class="video-detail" v-if="info.type==3">
       <mp-video :info="info" v-if="!ifFlvVideo"></mp-video>
      <object v-else
              classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
              codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0"
              width="640"
              height="480"
              id="VideoPlayer"
              align="middle"
      >
        <param name="allowScriptAccess" value="*" />
        <param name="allowFullScreen" value="true" />
        <param
                name="movie"
                :value="'https://file.njshushuo.com/flvplayer.swf?video='+info.linkUrl+'&autoplay=true'"
        />
        <param name="quality" value="high" />
        <param name="bgcolor" value="#ffffff" />
        <embed
                src="https://file.njshushuo.com/flvplayer.swf"
                :flashvars="flvUrl"
                quality="high"
                bgcolor="#000000"
                width="500"
                height="380"
                name="VideoPlayer"
                align="middle"
                allowScriptAccess="*"
                allowfullscreen="true"
                type="application/x-shockwave-flash"
                pluginspage="http://www.macromedia.com/go/getflashplayer"
        />
      </object>
    </div>
      <!--外链-->
      <div class="wailian-detail" v-if="info.type==4">
        <iframe   frameborder=0 name="showHere" scrolling=auto :src="urlInfo"></iframe>
        <div v-html="urlInfo"></div>
        <a :href="info.cont">{{info.cont}}</a>
      </div>
    <div class="detailMain" v-html="info.cont" v-if="info.cont && info.type!=2 && info.type!=4"></div>

    <p>{{info.editor}}</p>
    <button class="toVote" @click="questionnaireShow = true" v-if="questionnaireList.length>0">问卷调查</button>
    <div class="tj" style="display: none">
      <div id="NewsArticleID" style="display:none;">{{id}}</div>

      <div id="NewsArticleTitle" style="display:none;">{{info.nm}}</div>

      <div id="NewsEditionNumber" style="display:none;">{{info.pCatId}}</div>

      <div id="NewsEditionName" style="display:none;">{{info.pCatNm}}</div>

      <div id="NewsArticleType" style="display:none;">{{typeNm}}</div>

      <div id="NewsArticleSource" style="display:none;">{{info.newsSrc}}</div>

      <div id="NewsArticleAuthor" style="display:none;">{{info.author}}</div>

      <div id="NewsArticlePubDay" style="display:none;">{{info.releTm}}</div>

      <div id="SelfNewsArticleID" style="display:none;">{{id}}</div>
    </div>
  </div>
</template>
<script>


// import VueQr from "vue-qr";
import sian from "../img/sina.png";
import wechat from "../img/wechat.png";
//
    const questionnaire = resolve => require(['~/components/questionnaire.vue'],resolve)
    const mpVideo = resolve => require(['~/components/videoShowDetail.vue'],resolve)
export default {
  props: ["id",'width','infos' ],
  data() {
    return {
        typeNm:'',
        urlInfo:'',
        ifFlvVideo:false,
        flvUrl:'vcastr_file=http://www.zjfzol.com.cn/flv/与宪法同行.flv',
        types:'flv',
        swiperOptionTop: {
            autoHeight: true,
            spaceBetween: 10,
            loop: true,
            loopedSlides: 5, //looped slides should be the same
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        },
        swiperOptionThumbs: {
            spaceBetween: 10,
            slidesPerView: 4,
            touchRatio: 0.2,
            loop: true,
            loopedSlides: 5, //looped slides should be the same
            slideToClickedSlide: true,
        },

        info:{},
      share: false,
      showIframe:false,
      url: "",
      sian,
      wechat,
        imgList:[],
        imgIndex : 0,
        questionnaireShow:false,
        questionnaireList:[],
      timer:null,
    };
  },
  mounted() {
    this.timer = setTimeout(()=>{
      this.api.readAdd(this.info.id)
    },15000)
    // this.setInfo()
    // if(process.client){
      this.url = window.location.href;
      // this.$nextTick(()=>{
      //   this.getGuestionnaireList()
      // })
    // }

  },
  beforeDestroy(){
    clearTimeout(this.timer)
  },
  methods: {

    //全景播放
    openQuanjing(info){
      window.open(info.linkUrl)
    },

      // async getGuestionnaireList(){
      //
      //   this.questionnaireList = await this.api.getQuestionnaireList(this.id)
      // },
      qrClick(){
      },
    close() {
      this.$emit("close");
    },
      questionnaireClose(){
        this.questionnaireShow = false
      },
    // 微信分享
    shareWX() {},

    /**
     * 分享新浪微博
     * @param  {[type]} title [分享标题]
     * @param  {[type]} url   [分享url链接，默认当前页面]
     * @param  {[type]} pic   [分享图片]
     * @return {[type]}       [description]
     */
    shareSian(title, url, pic) {
      var param = {
        url: url || window.location.href,
        type: "3",
        count: "1" /** 是否显示分享数，1显示(可选)*/,
        appkey: "" /** 您申请的应用appkey,显示分享来源(可选)*/,
        title: "分享的标题" /** 分享的文字内容(可选，默认为所在页面的title)*/,
        pic: pic || "" /**分享图片的路径(可选)*/,
        ralateUid: "" /**关联用户的UID，分享微博会@该用户(可选)*/,
        rnd: new Date().valueOf()
      };
      var temp = [];
      for (var p in param) {
        temp.push(p + "=" + encodeURIComponent(param[p] || ""));
      }
      var targetUrl =
        "http://service.weibo.com/share/share.php?" + temp.join("&");
      window.open(targetUrl, "sinaweibo");
    },
      setInfo(data){
       if(this.infos){
         this.info = this.infos
       }
        if(data){
         this.info = JSON.parse(data)
       }
          document.title = this.info.nm
          // document.querySelector('meta[name="Keywords"]').setAttribute('content', this.info.keyWords)
          // document.querySelector('meta[name="Description"]').setAttribute('content', this.info.summary.description)
          this.info.releTm = this.info.releTm ? this.info.releTm.split(' ')[0] : ''


          if(this.info.type==1){

            this.typeNm = '新闻'



          }else if(this.info.type==2){
              this.typeNm = '图集'
              this.$nextTick(() => {
                  const swiperTop = this.$refs.swiperTop.swiper
                  const swiperThumbs = this.$refs.swiperThumbs.swiper
                  swiperTop.controller.control = swiperThumbs
                  swiperThumbs.controller.control = swiperTop

              })
              let imgList = this.info.linkUrl ? this.info.linkUrl.split(',') : []
              if(imgList.length>0){
                  imgList.forEach(item=>{
                      if(item.indexOf('http')>-1 && item.indexOf('.thumb.jpg')==-1){
                          let param = {
                              url:item,
                              nm:item.split('/')[item.split('/').length-1]
                          }
                          this.imgList.push(param)
                      }

                  })
              }


          }else if(this.info.type==3){
              this.typeNm = '视频'
              // if (this.flvPlayer) {
              //     this.flvPlayer.detachMediaElement();
              //     this.flvPlayer.destroy();
              // }
              // this.createVideo();
              this.ifFlvVideo = this.info.linkUrl.toLowerCase().indexOf('.flv')>-1 ? true : false

              this.flvUrl = 'vcastr_file='+this.info.linkUrl

          }else if(this.info.type==4){
              this.typeNm = '外链'
              this.urlInfo = this.info.cont;


          }else if(this.info.type==5){
              this.typeNm = '全景'
          }

      },

  },
  components: {
    // VueQr,
      questionnaire,
      mpVideo
  },
  watch: {
    id() {
      // this.getInfo();
    },
      info(){

      }
  }
};
</script>
<style lang="less">
.detailMain {
  p {
    font-size: 16px !important;
    color: #3f3f3f;
    line-height: 2.6 !important;
  }
}
</style>
<style lang="less" scoped>
@base: 18rem;
@import url("../assets/css/init.less");
#detail {
  /*width: 100%;*/
  box-sizing: border-box;
  padding: 20px;
  border-left: 1px solid #d8d8d8;
  border-right: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  overflow: hidden;
  margin: 0 auto;
  .swiper-slide {
    background-size: cover;
    background-position: center;

  }
  .gallery-top {
    /*height: 500px!important;*/
    width: 100%;
    img{
      width: auto;
      max-width: 100%;
    }
  }
  .gallery-thumbs {
    /*height: 20%!important;*/
    box-sizing: border-box;
    margin: 10px 0;
  }
  .gallery-thumbs .swiper-slide {
    /*width: 25%;*/
    /*height: 100%;*/
    opacity: 0.4;
    img{
      width: 100%;
      height: 100px;
    }
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }

  .shareWx {
    width: 100%;
    height: 100%;
    z-index: 99;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    display: flex;
    display: -webkit-flex;
    i {
      color: #ffffff;
      font-size: 40px;
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
    >div{
      margin: auto;
      img {
        width: auto;
        height: auto;
      }
    }

  }
  > p {
    text-align: right;
    padding-top: 20px;
  }
  .toVote{
    background: @themeColor;
    color: #ffffff;
    text-align: center;
    width: 100px;
    height: 40px;
    line-height: 40px;
    border: 0;
    float: right;
    cursor: pointer;
    margin-top: 10px;
  }
  .top {
    margin-bottom: 20px;
    text-align: center;
    border-bottom: 1px solid #d8d8d8;
    padding-bottom: 20px;
    position: relative;
    >span {
      position: absolute;
      top: -30px;
      right: 10px;
      cursor: pointer;
    }
    h1 {
      font-size: 22px;
      margin-bottom: 10px;
      font-weight: bold;
      line-height: 150%;
      margin-top: 30px;
    }
    h5{
      text-align: center;
      color: #3f3f3f;
      font-weight: normal;
      font-size: 18px;
      padding: 15px 0;
      line-height: 1.5;
    }
    p {
      color: #333;
      font-size: 12px;
      span{
        margin: 0 10px;
      }
    }
    .share {
      position: absolute;
      right: 0;
      bottom: 15px;
      img {
        width: 20px;
        cursor: pointer;
      }
    }
  }
  .detailMain {
    padding: 20px;
    overflow: auto;
  }
  /*图集*/
  .imgNews{

    .imgNewsSwiper{
      position: relative;
      p{
        position: absolute;
        z-index: 99;
        background: rgba(0,0,0,0.3);
        color: #ffffff;
        font-size: 14px;
        border-radius: 10px;
        padding: 3px 10px;
        left: 5px;
        top: 5px;
      }
    }
  }
/*  全景播放*/
  .quanjing-detail{
    padding-left: 50px;
    padding-right: 50px;
    iframe{
      width:100%;
      height: 400px;
    }
    p{
      width: fit-content;
      margin-top: 10px;
      border-bottom: 1px solid blue;
      &:hover{
        cursor: pointer;

      }
    }
  }
  /*视频播放
 */
  .video-detail{
    /*padding-left: 50px;*/
    /*padding-right: 50px;*/
    video{
      width:100%;
      height: 400px;
    }
    p{
      width: fit-content;
      margin-top: 10px;
      border-bottom: 1px solid blue;
      &:hover{
        cursor: pointer;

      }
    }
  }
/*    外链自动跳转*/
    .wailian-detail{
        iframe{
          width: 100%;
          height: 600px;
        }

    }
}
</style>
