<template>
  <div id="header" :style="{ width: bWidth + 'px' }">
    <div class="header-top" :style="{ width: width + 'px' }">
      <img src="@/img/logo.png" alt="">
      <!-- <div >
         <p>
          <a @click="addFavorite">收藏网站</a>|
          <a href="http://www.zjfzol.com.cn/" target="_blank">旧版入口</a>
        </p> 
      </div> -->
    </div>
    <div class="header-content">
      <div class="cont-wrap" :style="{ width: width + 'px' }">
        <ul>
          <li
            @click="toPage(item)"
            v-for="(item, index) in navList"
            v-if="item.showType === 0"
          >
            <p>{{ item.nm }}</p>
            <img :src="line" v-if="index < navList.length - 1" />
          </li>
        </ul>
        <div class="search">
          <input type="text" v-model="key" @keyup.enter="goSearch" />
          <button @click="goSearch">平台搜索</button>
        </div>
      </div>
    </div>
    <div
      class="index-bg"
      :style="{ backgroundImage: 'url(' + bgUrl + ')' }"
      v-if="ifBanner"
    >
      <div class="company-logo" :style="{ width: width + 'px' }">
        <img :src="logo" alt />
        <p>
          <img :src="item.imgUrl" v-for="item in maList" />
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import logo from "./img/logo.png";
import codeSmall from "./img/smallcode.png";
import codeBig from "./img/bigcode.png";
import line from "./img/line.png";
export default {
  name: "App",
  props: ["type", "width", "bWidth"],
  data() {
    return {
      line,
      navList: [
        {
          nm: "首页",
          cd: "home",
          url: "/home",
          showType: 0,
        },
      ],
      key: "",
      maList: [],
      logo,
      bgUrl: "",
      ifBanner: true, //是否显示banner，专题不显示
    };
  },
  async mounted() {
    this.getNav();
    if (this.$route.path == "/topic") {
      this.ifBanner = false;
    } else {
      this.getBanner();
      this.ifBanner = true;
    }
  },
  methods: {
    async getBanner() {
      let data = await this.api.getBanner();
      this.maList = data.ADPOSPC006;
      this.bgUrl = data.bannerBg[0].imgUrl;
    },

    //收藏
    addFavorite() {
      let url = window.location.href;
      let title = "之江法云";
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
      let qry = this.query.new();
      this.query.toW(qry, "pid", 0, "EQ");
      this.query.toO(qry, "sort", "asc");
      let data = await this.api.getNav(
        encodeURIComponent(this.query.toJsonStr(qry))
      );
      this.navList.push(...data);
    },
    toPage(item) {
      if (item.url) {
        window.location.href = "./index.html";
      } else {
        window.location.href =
          "./list.html#/newList?id=" + item.id + "&nm=" + item.nm;
        // this.$router.push({
        //     path: "/list#/newList",
        //     query: {
        //         id: item.id,
        //         nm: item.nm
        //     }
        // });
      }
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
@import url("../assets/css/init.less");
#header {
  border-bottom: 1px solid #e1e1e1;
  width: 100%;
  height: auto;
  .header-top {
    width: 100%;
    height: 135px;
    padding: 23px 221px;
    display: flex;
    align-items: center;
    // background-color: #1f65de;
    div {
      width: 100%;
      min-width: 1000px;
      margin: 0 auto;
      padding: 8px 0;
      color: #fff;
      position: relative;
      padding-left: 10px;
      box-sizing: border-box;
      p {
        background: url("./img/redBg.png") center center no-repeat;
        width: 326px;
        height: 38px;
        position: absolute;
        right: 0;
        top: 0;
        padding-top: 10px;
        text-indent: 130px;

        a {
          color: #ffffff;
          margin: 0 8px;
          cursor: pointer;
        }
      }
    }
  }
  .header-content {
    width: 100%;
    background-color: #1e2d4c;
    .cont-wrap {
      width: 1100px;
      margin: 0 auto;
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #fff;
      ul {
        display: flex;
        display: -webkit-flex;
        flex-flow: row nowrap;
        flex: 1;
        li {
          list-style: none;
          flex: 1;
          text-align: center;
          cursor: pointer;
          height: 76px;
          line-height: 76px;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          p {
            text-align: center;
            flex: 1;
          }
        }
        li:hover {
          text-decoration: underline;
          color: @themeColor;
        }
      }
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
  .index-bg {
    width: 100%;
    height: 300px;
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
    .company-logo {
      width: 1200px;
      margin: 0 auto;
      height: 300px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      padding: 0 1%;
      box-sizing: border-box;
      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
      > p {
        flex: 1;
        text-align: right;
        img {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
