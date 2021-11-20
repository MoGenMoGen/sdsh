<template>
  <div id="newList" :style="{ width: width + 'px' }">
    <div class="left">
      <div class="list">
        <div class="title">
          <span @click="toHome()">首页</span> >
          <p
            v-for="(item, index) in position"
            v-show="position.length > 0 && id != '4688713356973056'"
            :key="index"
          >
            <span @click="toList(item)">{{ item.nm }}</span
            >>
          </p>
          <span @click="toList(currentMenu)" style="color: #0c76b3">{{
            currentMenu.nm
          }}</span>
          <span v-show="DYaccout"> > {{ DYaccout }}</span>
          <span v-show="keyWord"> {{ keyWord }}</span>
        </div>
        <div class="listMain" v-if="!detailId">
          <!-- 纯文本 -->
          <list1 :id="id" v-if="showType == 2" @getDetail="getDetail"></list1>
          <!-- 图文 -->
          <list2
            :id="id"
            v-else-if="showType == 1"
            @getDetail="getDetail"
          ></list2>
          <!-- 领导班子 -->
          <list3 v-else-if="nm == '领导班子'"></list3>
          <!-- 商会介绍 -->
          <div v-else-if="nm == '商会介绍'" v-html="intro.cont">商会介绍</div>
          <div v-else>空</div>
        </div>
        <div
          v-if="detailId"
          style="width: 100%; padding: 30px; box-sizing: border-box"
        >
          <div
            style="
              width: 100%;
              text-align: center;
              font-size: 20px;
              font-weight: bold;
              color: #303030;
            "
          >
            {{ detailData.title }}
          </div>
          <div style="margin-top: 30px; display: flex; justify-content: center">
            <span style="margin-right: 30px; color: #909090">{{
              detailData.releTm
            }}</span>
            <span v-if="readNum > 0" style="color: #909090"
              >浏览量:{{ readNum }}</span
            >
          </div>
          <div v-html="detailData.cont"></div>
        </div>
      </div>
    </div>

    <div class="right">
      <latestList :nm="nm"></latestList>
      <!-- <right-new @getDetail="getDetail" :newsShow="newsShow"></right-new> -->
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
      newsShow: true, //右边的最新新闻是否显示
      newsNoShowArr: "4536030838313984", //右边不显示最新新闻的栏目
      width: 0,
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
      detailData: "",
      DYaccout: "",
      DYopenId: "", //抖音openId
      info: {}, //新闻详情
      nm: "", //传给latestList组件的名字
      showType: 0, //列表展现方式(1.图文 2.全文字 3.视频)
      intro: "", //商会介绍
      readNum: 0, //浏览量
      timer: null,
    };
  },
  created() {},
  async mounted() {
    this.width = this.until.getWidth().width;
    window.onresize = () => {
      return (() => {
        this.getWidth();
      })();
    };
    this.getInfo();
    this.getName();
    //商会介绍
    this.intro = await this.api.getListAll({
      cids: "1458345268556877826",
      current: 1,
      size: 10,
    });
    console.log("intro", this.intro);
    //详情
    if (this.detailId) {
      clearTimeout(this.timer);
      this.detailData = await this.api.getDetail(this.detailId);
      this.detailData.cont = this.detailData.cont.replace(
        /<img[^>]*>/gi,
        function (match, capture) {
          return match.replace(
            /(<img[^>]*)(\/?>)/gi,
            "$1style='max-width:100%;height:auto;' $2"
          );
        }
      );
      //15s后自动调用浏览量
      this.timer = setTimeout(async () => {
        this.readNum = await this.api.readAdd(this.detailId);
        console.log("aaaa", this.readNum);
      }, 15000);
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
    // return
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
        cids: context.query.id,
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
  },
  watch: {
    $route(to) {
      this.getInfo();
      this.getName();
    },
    async detailId() {
      if (this.detailId) {
        clearTimeout(this.timer);
        this.detailData = await this.api.getDetail(this.detailId);
        this.detailData.cont = this.detailData.cont.replace(
          /<img[^>]*>/gi,
          function (match, capture) {
            return match.replace(
              /(<img[^>]*)(\/?>)/gi,
              "$1style='max-width:100%;height:auto;' $2"
            );
          }
        );
        //15s后自动调用浏览量
        this.timer = setTimeout(async () => {
          this.readNum = await this.api.readAdd(this.detailId);
          console.log("aaaa", this.readNum);
        }, 15000);
      }
    },
  },
  methods: {
    getWidth() {
      let width = 0;
      let bWidth = 0;
      let widths = document.body.clientWidth;
      if (widths < 1000) {
        width = 1000;
        bWidth = 1000;
      }
      if (widths >= 1000 && widths <= 1200) {
        width = widths;
        bWidth = widths;
      }
      if (widths > 1200) {
        this.width = 1200;
        this.bWidth = widths;
      }
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
            return match.replace(
              /(<img[^>]*)(\/?>)/gi,
              "$1style='max-width:100%;height:auto;' $2"
            );
            // return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="max-width:100%;height:auto;"') // 替换style
          }
        );
        this.title = "山东商会 - " + this.info.title;
        if (!this.$refs.detail) {
          var myTimer = setInterval(() => {
            if (this.$refs.detail) {
              clearInterval(myTimer);

              this.$refs.detail.setInfo(JSON.stringify(this.info));
            }
          }, 100);
        } else {
          this.$refs.detail.setInfo(JSON.stringify(this.info));
        }

        if (this.info.newsSrc.indexOf("来源") == "-1") {
          this.info.newsSrc = "来源：" + this.info.newsSrc;
        }
        if (this.info.editor.indexOf("编辑") == "-1") {
          this.info.editor = "(责任编辑：" + this.info.editor + ")";
        }
        this.currentMenu = {
          nm: "详情",
        };
        let item = this.info.cids.split(",");
        let itemNm = this.info.cidsNm.split(",");
        item.forEach((item, index) => {
          this.position.push({
            id: item,
            nm: itemNm[index],
          });
        });
        // this.position.push({
        //   nm:this.info.catNm,
        //   id:this.info.catId,
        // })
        // if(this.info.pCatNm){ //上级栏目
        //   this.position[0]={
        //     nm:this.info.catNm,
        //     pId:this.info.pCatId,
        //     pNm:this.info.pCatNm,
        //     id:this.info.catId
        //   }
        //   this.position.unshift({
        //     nm:this.info.pCatNm,
        //     id:this.info.pCatId,
        //   })
        // }
        // if(this.info.ppCatNm){ //上上级栏目
        //     this.position[0]={
        //       nm:this.info.pCatNm,
        //       id:this.info.pCatId,
        //       pId:this.info.ppCatId,
        //       pNm:this.info.ppCatNm,
        //     }
        //   this.position[1]={
        //     ppNm:this.info.ppCatNm,
        //     ppId:this.info.ppCatId,
        //     pId:this.info.pCatId,
        //     pNm:this.info.pCatNm,
        //     nm:this.info.catNm,
        //     id:this.info.catId,
        //   }
        //   this.position.unshift({
        //     nm:this.info.ppCatNm,
        //     id:this.info.ppCatId,
        //   })
        // }

        if (this.newsNoShowArr.indexOf(this.position[0].id) > -1) {
          this.newsShow = false;
        } else {
          this.newsShow = true;
        }
        // this.currentMenu = this.position.pop()
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
        });
        this.title = "山东商会 - " + this.$route.query.nm;
      }
      if (this.$route.query.sId) {
        this.position.push({
          nm: this.$route.query.sNm,
          id: this.$route.query.sId,
        });
        this.title += " - " + this.$route.query.sNm;
        // this.id = this.$route.query.sId;

        // if(this.$route.query.ssId){
        //     this.position.push({
        //         nm:this.$route.query.sNm,
        //         id:this.$route.query.sId,
        //         pNm: this.$route.query.nm,
        //         pId: this.$route.query.id
        //     })
        //     this.id = this.$route.query.sId;
        // }
        if (this.newsNoShowArr.indexOf(this.position[0].id) > -1) {
          this.newsShow = false;
        } else {
          this.newsShow = true;
        }
      }
      this.keyWord = this.$route.query.key ? this.$route.query.key : "";
      this.ifSearch = this.keyWord ? true : false;
      if (this.ifSearch) {
        this.id = "";
        this.currentMenu = {};
        this.menuList = [];
      }
      // this.id = this.$route.query.id ? this.$route.query.id : "";
      if (this.id) {
        this.getMenu();
      }
    },
    // //显示账号下的抖音列表
    // setDYopenId(item){
    //   this.DYopenId = item.openId
    //   this.DYaccout = item.nickname
    // },
    async getMenu() {
      // console.log(this.id)
      if (this.id == "4688713356973056") {
        //专题左边导航不显示
        this.currentMenu = {
          nm: this.$route.query.nm,
        };
        return;
      }
      let data = await this.api.getMenuNav({ parentId: this.id });

      this.menuList = data;
      // console.log('menuList')
      // console.log(this.menuList)
      if (this.menuList.length > 0) {
        //有下级栏目
        this.currentMenu.id = this.menuList[0].id;
        // this.position.push({
        //   nm:this.menuList[0].title,
        //   id:this.menuList[0].id,
        // })
      } else {
        //没有下级栏目
        if (this.$route.query.detailId) {
          // console.log('222222222222')
          return;
        }
        this.currentMenu.id = this.id;
        this.currentMenu.nm = this.$route.query.nm;
        // console.log(this.currentMenu)
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
        if (this.menuList.length > 0) {
          this.currentMenu = JSON.parse(JSON.stringify(this.menuList[0]));
          this.currentMenu.nm = this.currentMenu.title;
          this.currentMenu.pId = this.position[0].id;
          this.currentMenu.pNm = this.position[0].nm;
          // console.log('获取第一个栏目')
          // console.log(this.currentMenu)
        } else {
          this.position = [];
          this.currentMenu.id = this.id;
          // let qry = this.query.new();
          // this.query.toW(qry, "pid", 0, "EQ");
          // this.query.toO(qry, "sort", "asc");
          // let data = await this.api.getMenuNav(
          //   encodeURIComponent(this.query.toJsonStr(qry))
          // );
          // let info = data.find(item=>{
          //   return item.id == this.id
          // })
          this.currentMenu.nm = this.$route.query.nm;
        }
      }
      // console.log(11111, this.currentMenu);
      // console.log(11111, this.position);
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
    toList(item) {
      let param = {
        nm: item.nm,
        id: item.id,
      };
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
      this.$router.push({
        path: "/newList",
        query: param,
      });
    },
    //获取传给右侧栏目组件的名字
    getName() {
      if (this.$route.query.id == "1458383124973244417") {
        this.nm = "领导班子";
      } else if (this.$route.query.id == "1458345268556877826") {
        this.nm = "商会介绍";
      } else {
        this.nm = "";
      }
    },
  },
};
</script>
<style lang="less" scoped>
@base: 18rem;
@import url("../../assets/css/init.less");
#newList {
  min-width: 1000px;
  overflow: auto;
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
    overflow: hidden;
    flex: 1;
    background: #fff;
  }
}
</style>
