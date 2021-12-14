<template>
  <div id="wrapper">
    <div class="header-content" :style="{ width: bWidth + 'px' }">
      <navTab :id="id"></navTab>
    </div>
    <div class="newList" :style="{ width: width + 'px' }">
      <div class="left">
        <div class="list">
          <div class="title">
            <span @click="toHome()">首页></span>
            <p
              v-for="(item, index) in position"
              v-show="position.length > 0 && id != '4688713356973056'"
              :key="index"
            >
              <span
                @click="toList(item, index)"
                :style="{ color: index > 0 ? '#0c76b3' : '' }"
                >{{ item.nm }}</span
              ><span v-show="index == 0">></span>
            </p>
            <span style="color: #0c76b3">{{ currentMenu.nm }}</span>
            <!-- <span @click="toList(currentMenu)" style="color: #0c76b3">22{{
              currentMenu.nm
            }}</span> -->
            <span v-show="DYaccout"> >{{ DYaccout }}</span>
            <span v-show="keyWord && !detailId" style="color: #0c76b3">
              {{ keyWord }}</span
            >
          </div>
          <div class="listMain" v-if="!detailId">
            <!-- 纯文本 -->
            <list1 :id="id" v-if="showType == 2" @getDetail="getDetail"></list1>
            <!-- 图文 -->
            <list2
              :id="id"
              :keyWord="keyWord"
              v-else-if="showType == 1 || keyWord"
              @getDetail="getSearchDetail"
            ></list2>
            <!-- 领导班子 -->
            <list3
              v-else-if="nm == '领导班子'"
              @getDetail="getDetail"
              :leaderId="leaderId"
            ></list3>
            <!-- 商会介绍 -->
            <div
              v-else-if="nm == '商会介绍'"
              style="padding: 30px; box-sizing: border-box"
            >
              <div
                style="
                  margin-bottom: 20px;
                  font-size: 20px;
                  font-weight: bold;
                  color: #303030;
                  text-align: center;
                "
              >
                {{ introItem.title }}
              </div>
              <div v-html="introItem.cont"></div>
            </div>
            <div v-else>空</div>
          </div>
          <div
            v-if="detailId"
            style="width: 100%; padding: 30px; box-sizing: border-box"
          >
            <detail
              :detailId="detailId"
              v-if="showType == 2 || showType == 1"
            ></detail>
            <!-- 领导班子详情 -->
            <leaderDetail
              :detailId="detailId"
              v-if="nm == '领导班子'"
            ></leaderDetail>
          </div>
        </div>
      </div>

      <div class="right">
        <latestList
          :nm="nm"
          @getIntroItem="getIntroItem"
          @getDetail="getSearchDetail"
          @handleLeader="handleLeader"
        ></latestList>
      </div>
    </div>
  </div>
</template>
<script>
const newListWord = (resolve) =>
  require(["@/components/newListWord.vue"], resolve);
const newListImg = (resolve) =>
  require(["@/components/newListImg.vue"], resolve);
const themeList = (resolve) => require(["@/components/themeList.vue"], resolve);
const douYinCat = (resolve) => require(["@/components/douYinCat.vue"], resolve);
const douYinList = (resolve) =>
  require(["@/components/douYinList.vue"], resolve);
const rightNew = (resolve) => require(["@/components/rightNew.vue"], resolve);
const newDetail = (resolve) => require(["../newDetail.vue"], resolve);
// import newListWord from '@/components/newListWord.vue'
// import newListImg from '@/components/newListImg.vue'
// import themeList from '@/components/themeList.vue'
// import douYinCat from '@/components/douYinCat.vue'
// import douYinList from '@/components/douYinList.vue'
// import rightNew from '@/components/rightNew.vue'
// import newDetail from './newDetail.vue'
import list1 from "@/components/list1.vue";
import list2 from "@/components/list2.vue";
import list3 from "@/components/list3.vue";
import latestList from "@/components/latestList.vue";
import detail from "@/components/detail.vue";
import leaderDetail from "@/components/leaderDetail.vue";
import navTab from "@/components/navTab.vue";
export default {
  head() {
    return {
      title: this.title,
      meta: [
        {
          name: "keywords",
          content: this.webKeyWord,
        },
        {
          name: "description",
          content: this.webContent,
        },
      ],
    };
  },
  data() {
    return {
      newsNoShowArr: "4536030838313984", //右边不显示最新新闻的栏目
      width: 0,
      bWidth: 0,
      position: [[]],
      ifSearch: false,
      type: 0,
      keyWord: "",
      title: "法治文化",
      webKeyWord: "",
      webContent: "",
      id: "",
      navName: "",
      currentMenu: {
        nm: "",
        type: null,
      },
      menuList: [],
      smallMenuList: [],
      list: [],
      pageNo: 1,
      pageSize: 20,
      total: 0,
      detailId: "",
      DYaccout: "",
      DYopenId: "", //抖音openId
      info: {}, //新闻详情
      nm: "", //传给latestList组件的名字
      showType: 0, //列表展现方式(1.图文 2.全文字 3.视频)
      intro: [], //商会介绍
      introItem: { title: "", cont: "" },
      leaderId: "", //领导班子职称
    };
  },
  created() {},
  async mounted() {
    // this.width = this.until.getWidth().width;
    this.getWidth();

    window.onresize = () => {
      return (() => {
        this.getWidth();
      })();
    };
    this.getInfo();
    this.getName();
    //商会介绍
    let list = await this.api.getListAll({
      cids: "1458357934457376770",
      current: 1,
      size: 10,
    });
    if (list.records.length > 0) {
      this.introItem = list.records[0];
      this.introItem.cont = this.introItem.cont.replace(
        /<img[^>]*>/gi,
        function (match, capture) {
          return match.replace(/(<img[^>]*)(\/?>)/gi, "$1width='100%' $2"); // 添加width="100%"
        }
      );
      this.introItem.cont = this.introItem.cont.replace(
        /<img[^>]*>/gi,
        function (match, capture) {
          return match.replace(
            /style\s*?=\s*?([‘"])[\s\S]*?\1/gi,
            'style="max-width:100%;height:auto;"'
          ); // 替换style
        }
      );
    }
    let index = 0;
    if (this.$route.query.sId) {
      index = this.intro.findIndex((item) => item.cid == this.$route.query.sId);
    } else {
      index = this.intro.findIndex((item) => item.cid == "1458357934457376770");
    }
  },

  computed: {
    rightWidth() {
      // console.log(this.width)
      let rWidth = this.menuList.length > 0 ? this.width * 0.86 : this.width;
      return (rWidth - 40) * 0.75 - 40;
    },
  },
  async asyncData(context) {
    return;
    if (process.client) {
      return;
    }
    let rightNewList = null;
    let urlArr = [];
    let info = {};
    let title = "";
    let webKeyWord = "";
    let webContent = "";
    let newList = [];
    let detailId = context.query.detailId ? context.query.detailId : "";

    rightNewList = await context.app.api.getListAll({
      current: 1,
      size: 10,
    });

    if (detailId) {
      //详情
      // info = {}
      info = await context.app.api.getNewDetail(detailId);
      title = info ? info.nm : "";
      webContent = info ? info.summary : "";
    }
    //列表
    if (context.query.nm && context.query.id) {
      title = "山东商会 - " + context.query.nm;
      let param = {
        cid: context.query.id,
        current: context.query.pageNo ? context.query.pageNo : 1,
        pageSize: 20,
      };
      newList = await context.app.api.getListAll(param);
      newList.records.forEach((item) => {
        urlArr.push(
          context.app.hostUrl + "/zjfzol/newList?detailId=" + item.id
        );
      });
    }
    if (context.query.key) {
      let param = {
        cont: context.query.key,
        current: context.query.pageNo ? context.query.pageNo : 1,
        size: 20,
      };
      let data = await context.app.api.search(param);
      newList = data.records;
    }
    return {
      title: title,
      webKeyWord: webKeyWord,
      webContent: webContent,
      info: info,
      newList: newList,
      urlArr: urlArr,
      rightNewList: rightNewList,
    };
  },
  components: {
    rightNew,
    newDetail,
    newListImg,
    newListWord,
    themeList,
    douYinList,
    douYinCat,
    list1,
    list2,
    list3,
    latestList,
    detail,
    leaderDetail,
    navTab,
  },
  watch: {
    async $route(to) {
      console.log("路由改变");
      this.getWidth();
      this.getInfo();
      this.getName();
      //商会介绍
      this.intro = await this.api.getListAll({
        cids: "1458345268556877826",
        current: 1,
        size: 10,
      });
      this.intro = this.intro.records;
      let index = 0;
      if (this.$route.query.sId) {
        index = this.intro.findIndex(
          (item) => item.cid == this.$route.query.sId
        );
      } else {
        index = this.intro.findIndex(
          (item) => item.cid == "1458357934457376770"
        );
      }
      // if (index >= 0) {
      //   this.introItem = this.intro[index];
      //   this.introItem.cont = this.introItem.cont.replace(
      //     /<img[^>]*>/gi,
      //     function (match, capture) {
      //       return match.replace(/(<img[^>]*)(\/?>)/gi, "$1width='100%' $2"); // 添加width="100%"
      //     }
      //   );
      //   this.introItem.cont = this.introItem.cont.replace(
      //     /<img[^>]*>/gi,
      //     function (match, capture) {
      //       return match.replace(
      //         /style\s*?=\s*?([‘"])[\s\S]*?\1/gi,
      //         'style="max-width:100%;height:auto;"'
      //       ); // 替换style
      //     }
      //   );
      // }
    },
  },
  methods: {
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
      console.log('列表width',this.width,this.bWidth);
    },
    toHome() {
      this.$router.push({ path: "/" });
    },
    async getInfo() {
      this.position = [];
      this.currentMenu = {};
      this.showType = this.$route.query.showType;
      this.detailId = this.$route.query.detailId
        ? this.$route.query.detailId
        : "";
      if (this.detailId) {
        //详情过来的
        this.info = await this.api.getNewDetail(this.detailId);
        this.info.cont = this.info.cont.replace("宋体", "微软雅黑");
        this.info.cont = this.info.cont.replace(
          /<img[^>]*>/gi,
          function (match, capture) {
            return match.replace(/(<img[^>]*)(\/?>)/gi, "$1width='100%' $2"); // 添加width="100%"
          }
        );
        this.info.cont = this.info.cont.replace(
          /<img[^>]*>/gi,
          function (match, capture) {
            return match.replace(
              /style\s*?=\s*?([‘"])[\s\S]*?\1/gi,
              'style="max-width:100%;height:auto;"'
            ); // 替换style
          }
        );
        this.title = "山东商会 - " + this.info.title;
        this.currentMenu = {
          nm: "详情",
        };
        let item = this.info.cids.split(",");
        let itemNm = this.info.cidsNm.split(",");
        item.forEach((item, index) => {
          this.position.push({
            id: item,
            nm: itemNm[index],
            showType: this.$route.query.showType,
          });
        });
        if (this.position.length > 0) {
          this.id = this.position[0].id; //按栏目仅有两级写代码
          this.getMenu();
        }
        this.detailId = this.info.id;
        return;
      }
      //详情结束
      if (this.$route.query.id) {
        this.id = this.$route.query.id;
        this.position.push({
          id: this.$route.query.id,
          nm: this.$route.query.nm,
          showType: this.$route.query.showType,
        });
        this.title = "山东商会 - " + this.$route.query.nm;
      }
      if (this.$route.query.sId) {
        this.position.push({
          nm: this.$route.query.sNm,
          id: this.$route.query.sId,
        });
        this.title += " - " + this.$route.query.sNm;
      }
      this.keyWord = this.$route.query.key ? this.$route.query.key : "";
      this.ifSearch = this.keyWord ? true : false;
      if (this.ifSearch) {
        this.id = "";
        this.currentMenu = {};
        this.menuList = [];
      }
      if (this.id) {
        this.getMenu();
      }
    },
    async getMenu() {
      let data = await this.api.getMenuNav({ parentId: this.id });
      this.menuList = data;
      if (this.menuList.length > 0) {
        //有下级栏目
        this.currentMenu.id = this.menuList[0].id;
      } else {
        //没有下级栏目
        if (this.$route.query.detailId) {
          return;
        }
        this.currentMenu.id = this.id;
        this.currentMenu.nm = this.$route.query.nm;
      }
      if (this.$route.query.sId) {
        //有指定的二级栏目id
        let current = null;

        if (this.$route.query.ssId) {
          //有指定的三级栏目id
          current = this.menuList.find((item) => {
            return item.id == this.$route.query.ssId;
          });
          this.currentMenu = JSON.parse(JSON.stringify(current));
          this.currentMenu.ppNm = this.position[0].nm;
          this.currentMenu.ppId = this.position[0].id;
          this.currentMenu.pId = this.position[1].id;
          this.currentMenu.pNm = this.position[1].nm;
        } else {
          //没有指定的三级栏目
          // console.log(this.menuList)
          current = this.menuList.find((item) => {
            return item.id == this.$route.query.sId;
          });
          this.currentMenu = JSON.parse(JSON.stringify(current));
          this.currentMenu.pNm = this.position[0].nm;
          this.currentMenu.pId = this.position[0].id;
        }
      } else if (this.$route.query.detailId) {
        //详情
      } else {
        //对领导班子的特殊处理
        if (this.menuList.length > 0 && this.id != "1458383124973244417") {
          this.currentMenu = JSON.parse(JSON.stringify(this.menuList[0]));
          // console.log('currentmudiklghdfklghfeklgjiol',this.currentMenu);
          this.currentMenu.nm = this.currentMenu.title;
          this.currentMenu.pId = this.position[0].id;
          this.currentMenu.pNm = this.position[0].nm;
          // console.log('获取第一个栏目')
          // console.log(this.currentMenu)
        } else {
          this.position = [];
          this.currentMenu.id = this.id;

          this.currentMenu.nm = this.$route.query.nm;
        }
      }
    },
    //更换url,页面跳转
    async toMenu(item) {
      // console.log('跳转')
      // console.log(item)
      //   let qry = this.query.new();
      //   this.query.toW(qry, "pid", item.id, "EQ");
      //   this.query.toO(qry, "sort", "asc");
      //   let data = await this.api.getMenuNav({parentId:item.id});
      // console.log(data)
      this.currentMenu.id = item.id;
      this.currentMenu.nm = item.title;
      // this.currentMenu.type = item.showtype;
      // window.console.log(this.currentMenu)
      this.$router.push({
        path: "/newList",
        query: {
          sNm: item.title,
          sId: item.id, //如果没有父级，则为顶级栏目，所以这个不用传
          nm: this.position[0].nm,
          id: this.id,
          time: new Date().getTime(),
        },
      });
      // return
      // if(data.length>0){ //有下级栏目显示下级栏目
      //   // console.log(1)
      //     this.menuList = data
      //     this.position.push({
      //         nm:this.currentMenu.nm,
      //         pNm:this.position[0].nm,
      //         pId:this.position[0].id,
      //         sId:this.currentMenu.id,
      //         // sId:this.currentMenu.id
      //     })
      //
      //     this.currentMenu = JSON.parse(JSON.stringify(this.menuList[0]));
      //     this.$router.push({
      //         path: "/newList",
      //         query: {
      //             sNm:item.nm, //二级栏目
      //             sId: item.id,
      //             nm: this.position[0].nm, //顶级
      //             id: this.position[0].id,
      //             ssId:this.menuList[0].id, //当前
      //             // ssNm:item.nm,
      //             time:new Date().getTime()
      //         }
      //     });
      //
      // }else {  //没有显示当前栏目的列表
      //     this.currentMenu.id = item.id;
      //     this.currentMenu.nm = item.title;
      //     this.currentMenu.type = item.type;
      //     if(this.position.length>1){
      //         this.$router.push({
      //             path: "/newList",
      //             query: {
      //                 sNm:this.position[1].nm, //二级栏目
      //                 sId: this.position[1].id,
      //                 nm: this.position[0].nm, //顶级
      //                 id: this.position[0].id,
      //                 ssId:this.currentMenu.id, //当前
      //                 // ssNm:item.nm,
      //                 time:new Date().getTime()
      //             }
      //         });
      //     }else {
      //         this.$router.push({
      //             path: "/newList",
      //             query: {
      //                 sNm:this.currentMenu.nm,
      //                 sId: this.currentMenu.id, //如果没有父级，则为顶级栏目，所以这个不用传
      //                 nm: this.position[0].nm,
      //                 id: this.position[0].id,
      //                 time:new Date().getTime()
      //             }
      //         });
      //     }
      //
      // }
    },

    getDetail(info) {
      this.$router.push({
        path: "/newList",
        query: {
          detailId: info.id,
          showType: this.showType,
          nm: this.nm,
          time: new Date().getTime(),
        },
      });
    },
    getSearchDetail(info) {
      this.$router.push({
        path: "/newList",
        query: {
          detailId: info.id,
          showType: 1,
          // nm: this.nm,
          time: new Date().getTime(),
        },
      });
    },
    toPage(url) {
      this.until.href(url);
    },
    close() {
      this.until.back();
      // if(this.position.length==0){
      //     this.until.back()
      // }else {
      //     this.detailId = "";
      // }
    },
    toList(item, index) {
      console.log("item", item);
      let param = {
        nm: item.nm,
        id: item.id,
        showType: item.showType,
      };
      if (index > 0) {
      } else {
        if (item.ppId) {
          //有三层
          param = {
            nm: item.ppNm,
            id: item.ppId,
            sNm: item.pNm,
            sId: item.pId,
            ssId: item.id,
            time: new Date().getTime(),
          };
        } else if (item.pId) {
          //二层
          param = {
            nm: item.pNm,
            id: item.pId,
            sNm: item.nm,
            sId: item.id,
            time: new Date().getTime(),
          };
        }
        //领导班子特殊处理
        if (item.id == "1458383124973244417") {
          this.leaderId = "";
        }
        this.$router.push({
          path: "/newList",
          query: param,
        });
      }
    },
    //获取传给右侧栏目组件的名字
    getName() {
      if (
        this.$route.query.id == "1458383124973244417" ||
        this.$route.query.nm == "领导班子"
      ) {
        this.nm = "领导班子";
      } else if (this.$route.query.id == "1458345268556877826") {
        this.nm = "商会介绍";
      } else {
        this.nm = "";
      }
    },
    async getIntroItem(info) {
      let list = await this.api.getListAll({
        cids: info.id,
        current: 1,
        size: 10,
      });
      if (list.records.length > 0) {
        this.introItem = list.records[0];
        this.introItem.cont = this.introItem.cont.replace(
          /<img[^>]*>/gi,
          function (match, capture) {
            return match.replace(/(<img[^>]*)(\/?>)/gi, "$1width='100%' $2"); // 添加width="100%"
          }
        );
        this.introItem.cont = this.introItem.cont.replace(
          /<img[^>]*>/gi,
          function (match, capture) {
            return match.replace(
              /style\s*?=\s*?([‘"])[\s\S]*?\1/gi,
              'style="max-width:100%;height:auto;"'
            ); // 替换style
          }
        );
      }

      // console.log(12434,info);
      // let index = this.intro.findIndex((item) => item.cid == info.id);
      // if (index >= 0) {
      //   this.$router.push({
      //     path: "/newList",
      //     query: {
      //       id: this.$route.query.id,
      //       nm: this.$route.query.nm,
      //       showType: this.$route.query.showType,
      //       sNm: info.title,
      //       sId: info.id,
      //     },
      //   });
      // }
    },
    handleLeader(info) {
      console.log("父级右侧", info);
      this.leaderId = info.id;
      this.$router.push({
        path: "/newList",
        query: {
          // id: this.$route.query.id,
          id: "1458383124973244417",
          nm: this.$route.query.nm,
          showType: this.$route.query.showType,
          sNm: info.title,
          sId: info.id,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
@base: 18rem;
@import url("../../assets/css/init.less");

#wrapper {
  .header-content {
    width: 100%;
    background: #fff;
  }
  .newList {
    // min-width: 1000px;
    // overflow: hidden;
    margin: 20px auto;
    display: flex;
    display: -webkit-flex;
    .left {
      width: 75%;
      background: #ffffff;
      box-sizing: border-box;
      display: flex;
      overflow: auto;
      display: -webkit-flex;
      position: relative;
      margin-right: 20px;
      .list {
        width: 100%;
        .title {
          // background: #2d8ce1;
          width: 100%;
          height: 57px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #e8e8e8;
          // color: #ffffff;
          // text-indent: 20px;
          padding: 10px 0;
          padding-left: 20px;

          box-sizing: border-box;
          span {
            cursor: pointer;

            color: #909090;
          }
          span:hover {
            text-decoration: underline;
          }
          p {
            display: inline;
          }
        }
        .listMain {
          // padding: 20px;
          // border-left: 1px solid #d8d8d8;
          // border-right: 1px solid #d8d8d8;
          // border-bottom: 1px solid #d8d8d8;
          // overflow: hidden;
        }
      }
    }
    .right {
      // overflow: hidden;
      // flex: 1;
      width: calc(~"25% - 20px");
      background: #fff;
    }
  }
}
</style>
