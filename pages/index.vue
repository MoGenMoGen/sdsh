<template>
  <div id="home" :style="{ width: bWidth + 'px' }">
    <div class="header-content">
      <navTab id=""></navTab>    
    </div>
    <div class="main" :style="{ width: width + 'px' }">
      <el-carousel style="height: 350px; margin: 15px 0">
        <el-carousel-item v-for="(item, index) in banner" :key="index">
          <img
            :src="item.imgUrl"
            alt=""
            style="width: 100%; height: 350px; object-fit: cover"
          />
        </el-carousel-item>
      </el-carousel>

      <div class="news_info">
        <homeNewList type="3"></homeNewList>
        <homeNewList type="4"></homeNewList>
        <homeNewList type="5"></homeNewList>
        <homeNewList type="6"></homeNewList>
        <homeNewList type="8"></homeNewList>
        <homeNewList type="2"></homeNewList>
      </div>
      <div class="friend_link">
        <div class="title_box">
          <div class="title">友情链接</div>
          <span>更多></span>
        </div>
        <div class="content_box">
          <div
            class="item"
            v-for="(item, index) in friendLinks"
            :key="index"
            @click="toLink(item.relaUrl)"
          >
            {{ item.name
            }}<span
              style="margin: 0 20px; color: rgba(0, 0, 0, 0.2)"
              v-if="index != friendLinks.length - 1"
              >|</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import SocityRaw from "@/components/SocityRaw";
import homeNewList from "@/components/homeNewList";
import navTab from "@/components/navTab.vue";

export default {
  head: {
    script: [],
  },
  data() {
    return {
      name: "",
      width: 1000,
      bWidth: 0,
      friendLinks: [
        {
          nm: "浙江商会",
          url: "http://www.baidu.com",
        },
        {
          nm: "浙江商会",
          url: "http://www.baidu.com",
        },
        {
          nm: "浙江商会",
          url: "http://www.baidu.com",
        },
        {
          nm: "浙江商会",
          url: "http://www.baidu.com",
        },
        {
          nm: "浙江商会",
          url: "http://www.baidu.com",
        },
      ],
      banner: [],
    };
  },
  components: {
    SocityRaw,
    homeNewList,
    navTab,
  },
  async mounted() {
    // return
    this.getWidth();
    window.onresize = () => {
      return (() => {
        this.getWidth();
      })();
    };
    //轮播图
    this.api.getAdr("ADPOS.001", 2).then((res) => {
      this.banner = res;
    });
    //友情链接
    this.friendLinks = await this.api.getMedia();
  },
  watch: {},
  methods: {
    getWidth() {
      let width = document.body.clientWidth-17;
      if (width < 1000) {
        this.width = 1000-17;
        this.bWidth = 1000-17;
      }
      if (width >= 1000 && width <= 1200) {
        this.width = 1000;
        this.bWidth = width;
      }
      if (width > 1200) {
        this.width = 1200;
        this.bWidth = width;
      }
      console.log('首页width',this.width,this.bWidth);

    },
    async getList(data) {
      return await this.api.getListAll(data);
    },
    toList(nm, item) {
      let param = {};
      if (item.pid) {
        param = {
          nm: nm, //上级栏目名字
          id: item.pid, //上级栏目id
          sId: item.id, //当前栏目id
        };
      } else {
        param = {
          nm: nm, //上级栏目名字
          id: item.id, //上级栏目id
        };
      }

      this.$router.push({ path: "/newList", query: param });
    },
    toDetail(info) {
      // this.until.seSave('detailId',info.id)
      this.$router.push({
        path: "/newList",
        query: {
          detailId: info.id,
          time: new Date().getTime(),
        },
      });
    },
    toLink(url) {
      window.open(url);
    },
    toPage(url) {
      this.until.href(url);
    },
  },
};
</script>
<style lang="less">
#home {
  .swiper-wrapper {
    padding: 0 0 20px;
    box-sizing: border-box;
  }
  .el-carousel--vertical {
    height: 100%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    background-image: none !important;
    font-size: 50px;
    color: #999999;
    top: 42%;
  }
  .swiper-button-prev:after,
  .swiper-container-rtl .swiper-button-next:after {
    display: none;
  }
}

.swiper.block .el-carousel.el-carousel__indicators {
  left: 80%;
  transform: translateX(0);
  .el-carousel__button {
    width: 10px;
    height: 10px;
  }
  .is-active {
    .el-carousel__button {
      background-color: #ff2400;
    }
  }
}
</style>
<style lang="less" scoped>
@import url("../assets/css/init.less");
#home {
  margin: 0 auto;
  .header-content {
    width: 100%;
    background: #fff;
  }
  .main {
    .news_info {
      margin: 15px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .friend_link {
      width: 100%;
      padding: 20px;
      padding-bottom: 70px;
      box-sizing: border-box;
      background: #fff;
      margin-bottom: 40px;
      .title_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e8e8e8;
        padding: 10px 0;
        .title {
          position: relative;
          font-size: 18px;
          color: #333333;
          font-weight: bold;
        }
        .title::after {
          content: "";
          width: 70px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -10px;
          height: 2px;
          background: #0c76b3;
        }
      }
      .content_box {
        padding: 20px 0;
        display: flex;
        .item {
          // width: 80px;
          font-size: 14px;
          font-weight: 400;
          color: #606060;
          cursor: pointer;
        }
        .item:hover {
          color: #0c76b3;
        }
      }
    }
  }
}
</style>
<style lang="less">
.el-carousel__container {
  height: 100% !important;
}
.el-carousel--horizontal {
  height: 100%;
}
.el-carousel__indicators--horizontal {
  right: 5%;
  left: auto;
  .el-carousel__button {
    width: 10px;
    height: 10px;
    background: #a7a7a7;
  }
  .is-active .el-carousel__button {
    background: #ff2400;
  }
}
.el-carousel__item {
  .img {
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    img {
      margin: auto;
    }
  }
  p {
    text-align: center;
  }
}
/*.el-carousel__item h3 {*/
/*color: #475669;*/
/*font-size: 14px;*/
/*opacity: 0.75;*/
/*line-height: 150px;*/
/*margin: 0;*/
/*}*/

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/*.el-carousel__item h3 {*/
/*color: #475669;*/
/*font-size: 14px;*/
/*opacity: 0.75;*/
/*line-height: 150px;*/
/*margin: 0;*/
/*}*/

/*.el-carousel__item:nth-child(2n) {*/
/*background-color: #99a9bf;*/
/*}*/

/*.el-carousel__item:nth-child(2n + 1) {*/
/*background-color: #d3dce6;*/
/*}*/
</style>
