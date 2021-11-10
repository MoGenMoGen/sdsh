<template>
  <div id="newList" :style="{width:width+'px'}">
    <div class="right">
      <div class="list">
        <div class="title">
          <span @click="toHome()">浙江法治在线</span> > {{cNm}}
        </div>

        <div class="listMain">
          <list :width="rightWidth"></list>
        </div>
      </div>
      <div class="rightRight">
        <right-new @getDetail="getDetail"></right-new>
      </div>
    </div>
  </div>
</template>
<script>
    // import list from "@/components/eZineList";
    const list = resolve => require(['@/components/eZineList.vue'],resolve)
    import rightNew from "@/components/rightNew";
    export default {
        data() {
            return {
              width:0,
                position:[[]],
                ifSearch: false,
                type: 0,
                keyWord: "",
                title: "法治文化",
                id: "",
                navName: "",
                currentMenu: {},
                menuList: [],
                smallMenuList: [],
                list: [],
                pageNo: 1,
                pageSize: 20,
                total: 0,
                detailId: "",
                info:{}, //新闻详情
              cNm:'电子杂志',
            };
        },
        mounted() {
          this.cNm = this.until.getQueryString('cNm')
          this.getWidth()
        },
        computed:{
            rightWidth() {
                let rWidth = this.menuList.length>0 ? this.width*0.86 : this.width
                return (rWidth-40)*0.75-40
            }
        },

        components: {
            rightNew,
            list,
        },
        watch: {
            $route(to) {
            }
        },

        methods: {
          getWidth() {
            let width = 0
            let bWidth = 0
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
            }else {
              this.width = width;
              this.bWidth = bWidth;
            }
          },
            toHome() {
                this.$router.push({ path: "/home" });
            },

            toPage(url){
                this.until.href(url)
            },
            getDetail(info) {
                this.$router.push({
                    path: "/newList",
                    query: {
                        detailId: info.id,
                        time:new Date().getTime()
                    }
                });
            },
        }
    };
</script>
<style lang="less" scoped>
  @base: 18rem;
  @import url("../assets/css/init.less");
  #newList {
    width: 72%;
    min-width: 1000px;
    overflow: auto;
    margin: 20px auto;
    display: flex;
    display: -webkit-flex;

    .right {
      ul {
        position: absolute;
        top: 0;
        left: 0;
        li {
          background: #2d8ce1;
          text-align: center;
          color: #ffffff;
          padding: 12px 10px;
          width: 100%;
          box-sizing: border-box;
          margin-bottom: 10px;
          cursor: pointer;
        }
      }
      flex: 1;
      background: #ffffff;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      overflow: auto;
      display: -webkit-flex;
      position: relative;
      .list {
        width: 75%;
        .title {
          background: #2d8ce1;
          width: 100%;
          color: #ffffff;
          text-indent: 20px;
          padding: 10px 0;
          box-sizing: border-box;
          span {
            cursor: pointer;
          }
          span:hover{
            text-decoration: underline;
          }
          p{
            display: inline;
          }
        }
        .listMain {
          padding: 20px;
          border-left: 1px solid #d8d8d8;
          border-right: 1px solid #d8d8d8;
          border-bottom: 1px solid #d8d8d8;
          overflow: hidden;
        }
      }
    }
  }
  .rightRight {
    margin-left: 2%;
    flex: 1;
  }
</style>
