<template>
  <div
    id="container"
    :style="{ width: bWidth + 'px' }"
    :class="{ topic: ifTopic }"
  >
    <div id="header" :style="{ width: bWidth + 'px' }" v-show="!declare">
      <div class="header-top" :style="{ width: width + 'px' }">
        <img
          @click="tohome"
          src="@/img/logo.png"
          style="width: 455px; height: 88px; object-fit: fill"
          alt=""
        />
        <div class="searchbox">
          <el-input
            v-model="key"
            @keyup.enter.native="goSearch"
            clearable
          ></el-input>
          <img
            src="@/img/search-icon.png"
            style="width: 40px; height: 40px; object-fit: fill"
            alt=""
            @click="goSearch"
          />
        </div>

        <!-- <div :style="{width:width+'px'}">
          <p>
            <a @click="addFavorite">收藏网站</a>
          </p>
        </div> -->
      </div>
      <!-- <div class="header-content" :style="{ width: width + 'px' }"> -->
      <!-- <div class="cont-wrap" :style="{ width: width + 'px' }"> -->
      <!-- <ul>
          <li
            @click="toPage(item, index)"
            v-for="(item, index) in navList"
            :key="index"
            :class="{ active: currentTab == index }"
            style="text-align: center"
          >
            {{ item.title }}
          </li>
        </ul> -->

      <!-- <div class="search">
            <input type="text" v-model="key" @keyup.enter="goSearch" />
            <button @click="goSearch">平台搜索</button>
          </div> -->
      <!-- </div> -->
      <!-- </div> -->
    </div>
    <div class="content-link" :class="{ contentDeclar: declare }">
      <!-- <nuxt :width="bWidth" :bWidth="bWidth" /> -->
      <nuxt/>
    </div>
    <myFooter
      :width="width"
      :bWidth="bWidth"
      v-show="!declare && !ifTopic"
    ></myFooter>
  </div>
</template>
<script>
// import homeTop from "@/components/homeTop";
import myHeader from "@/components/myHeader";
import myFooter from "@/components/myFooter";

import codeBig from "./img/bigcode.png";
import line from "./img/line.png";
export default {
  data() {
    return {
      width: 0,
      bWidth: 0,
      line,
      ddCode: "",
      currentNav: "",
      currentTab: 0,
      navList: [
        {
          title: "首页",
          cd: "home",
          url: "/",
          showType: 0,
        },
      ],
      key: "",
      maList: [],
      codeBig,
      title: "投稿信息",
      iScur: 4,
      declare: false, //是否是申报页面，是的话头部底部都不显示
      ifHeader: true, //是否显示头部，
      ifTopic: false, //是否专题
    };
  },
  computed: {},
  async mounted() {
    // return
    // const script = document.createElement('script')
    // script.src = '//ta.8531.cn/c/js/ta.js?mpid=143'
    // script.id = '_trs_ta_js'
    // script.async = 'async'
    // script.defer = 'defer'
    // script.language = 'JavaScript'
    // // console.log(script)
    // document.body.appendChild(script)
    // console.log(document.body)
    this.changeRoute();
    // this.$nextTick(() => {
      this.getWidth();
      // this.ifPC();
    // });
    window.onresize = () => {
      return (() => {
        this.getWidth();
        // this.ifPC();
      })();
    };
    this.getNav();
    // this.navList.push(

    // );
  },

  methods: {
    ifPC() {
      let appUrl = "http://zjfyweb.jinkworld.com/";
      // let appUrl = 'http://192.168.0.67:8080/'
      console.log(this.App.IsPC());
      if (!this.App.IsPC()) {
        //不是PC端打开
        if (window.location.pathname === "/zjfy/") {
          //首页
          window.location.href = appUrl;
          //window.location.href='https://fzol.jiaxiangtech.com/wx/index.html'
        }
        if (window.location.pathname.indexOf("newList") > -1) {
          //新闻列表
          if (window.location.search.indexOf("detailId") > -1) {
            window.location.href =
              appUrl +
              "#/list?title=" +
              this.until.getQueryString2("nm") +
              "&id=" +
              this.until.getQueryString2("id");
          } else {
            window.location.href = appUrl + "#/list?title=新媒矩阵";
          }
          // window.location.href = window.location.origin+'/wx/list.html?pid='+this.until.getQueryString2('id')+'&nm='+this.until.getQueryString2('nm')
        }
        if (
          window.location.pathname.indexOf("newList") > -1 &&
          window.location.search.indexOf("detailId") > -1
        ) {
          //新闻详情
          window.location.href =
            appUrl + "#/newsDetail?id=" + this.until.getQueryString2("id");
        }
        // if(window.location.pathname.indexOf('newList')>-1 && window.location.search.indexOf('id')>-1 && this.until.getQueryString2('id')=='4688713356973056'){ //专题列表
        //   window.location.href = window.location.origin+'/wx/pfztList.html'
        // }
        // if(window.location.pathname.indexOf('topic')>-1){ //专题详情
        //   window.location.href = window.location.origin+'/wx/ztDetail.html?id='+this.until.getQueryString2('id')
        // }
        // if(window.location.pathname.indexOf('declare')>-1){ //申报
        //   window.location.href = window.location.origin+'/wx/declare.html'
        // }
      }
    },

    getWidth() {
      let width = document.body.clientWidth;
      if (width < 1000) {
        this.width = 1000;
        this.bWidth = 1000;
      }
      if (width >= 1000 && width <= 1200) {
        this.width = 1000;
        this.bWidth = width;
      }
      if (width > 1200) {
        this.width = 1200;
        this.bWidth = width;
      }
    },

    //收藏
    addFavorite() {
      let url = window.location.href;
      let title = "山东商会";
      try {
        window.external.addFavorite(url, title);
      } catch (e) {
        try {
          window.sidebar.addPanel(title, url, "");
        } catch (e) {
          alert(
            "抱歉，您所使用的浏览器无法完成此操作。\n\n请使用快捷键Ctrl+D进行添加！"
          );
        }
      }
    },
    goSearch() {
      if (!this.key) {
        this.$message({
          showClose: true,
          message: "请输入搜索关键字",
          type: "warning",
        });
        return;
      }
      this.$router.push({
        path: "/newList",
        query: {
          key: this.key,
          time: new Date().getTime(),
        },
      });
    },
    async getNav() {
      let data = await this.api.getMenuNav({ parentId: 0 });
      data.forEach((item) => {
        if (item.showPos.indexOf("1") > -1) {
          this.navList.push(item);
        }
      });
      console.log(1242345, this.navList);
    },

    toPage(item, index) {
      if (item.url) {
        this.$router.push("/");
        this.currentTab = 0;
      } else {
        this.currentTab = index;
        this.currentNav = item.nm;
        this.$router.push({
          path: "/newList",
          query: {
            id: item.id,
            nm: item.title,
            showType: item.showType,
          },
        });
      }
    },
    tohome() {
      window.location.replace("/");
    },
    changeRoute() {
      if (window.location.pathname.indexOf("/topic") > -1) {
        this.ifTopic = true;
        document.getElementsByTagName("html")[0].style.height = "100%";
      } else {
        this.ifTopic = false;
      }
      if (window.location.pathname.indexOf("/declare") > -1) {
        this.declare = true;
        document.getElementsByTagName("html")[0].style.height = "100%";
      } else {
        this.declare = false;
      }
    },
  },
  components: {
    myHeader,
    myFooter,
  },
  watch: {
    $route(to) {
      this.changeRoute();
    },
  },
};
</script>

<style lang="less" scoped>
.el-input /deep/ .el-input__inner {
    border-radius: 0px;
}

.el-popover {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  min-width: auto;
  padding: 0;
  img {
    width: auto;
    height: auto;
  }
}
body {
  // background: url("./img/bg.png") repeat center;
}
</style>
<style lang="less" scoped>
@base: 18rem;
@import url("../assets/css/init.less");
.topic {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content-link {
    overflow: auto;
    height: 100%;
  }
}
#container {
  background: #f2f3f7;
  // background: url("./img/bg.png") repeat center;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  max-width: 100%;
  min-height: 100vh;
  overflow-y: hidden;

  #header {
    border-bottom: 1px solid #e1e1e1;
    background: #fff;
    width: 100%;
    height: auto;
    // padding: 0 221px;
    // box-sizing: border-box;
    .header-top {
      // width: 100%;
      box-sizing: border-box;
      padding: 23px 0px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // border-bottom: 1px solid #e6e7eb;
      .searchbox {
        display: flex;
        .el-input {
          width: 324px;
        }
      }
      // div {
      //   width: 100%;
      //   min-width: 1000px;
      //   margin: 0 auto;
      //   height: 38px;
      //   color: #fff;
      //   position: relative;
      //   padding-left: 10px;
      //   box-sizing: border-box;
      //   p {
      //     background: url("./img/redBg.png") center center no-repeat;
      //     width: 326px;
      //     height: 40px;
      //     position: absolute;
      //     right: 0;
      //     top: 0;
      //     padding-top: 8px;
      //     text-indent: 175px;

      //     a {
      //       color: #ffffff;
      //       margin: 0 8px;
      //       cursor: pointer;
      //     }
      //   }
      // }
    }
    .header-content1 {
      // width: 100%;
      // padding: 0 221px;
      // box-sizing: border-box;

      // background-color: #1e2d4c;
      // .cont-wrap {
      // width: 1100px;
      // margin: 0 auto;
      // display: flex;
      // display: -webkit-flex;
      // flex-flow: row nowrap;
      // align-items: center;
      // color: #fff;
      ul {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: space-between;
        // flex-flow: row nowrap;
        // flex: 1;
        li {
          text-align: center;
          color: #999;
          list-style: none;
          flex: 1;
          cursor: pointer;
          height: 56px;
          line-height: 56px;
          // display: flex;
          // display: -webkit-flex;
          // align-items: center;
          // display: inline-block;
          // p {
          //   text-align: center;
          //   flex: 1;
          // }
        }
        .active {
          color: #0c76b3;
          position: relative;
        }
        .active::after {
          content: "";
          width: 70px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 2px;
          height: 2px;
          background: #0c76b3;
        }
        // li:hover {
        //   text-decoration: underline;
        //   color: @themeColor;
        // }
        // }
      }
      .search {
        margin-left: 4%;
        margin-right: 1%;
        input {
          border: 0;
          background-color: #8e95a6;
          padding: 5px 0;
        }
        button {
          cursor: pointer;
          margin-left: 10px;
          padding: 5px;
          border: 0;
          background-color: #000;
          color: #fff;
        }
      }
    }
  }
  .content-link {
    // flex: 1;
    width: 100%;

    /*display: flex;*/
    /*display: -webkit-flex;*/
    /*flex-flow: row nowrap;*/
    /*justify-content: space-between;*/
  }
  .contentDeclar {
    height: 100%;
  }
}
</style>
