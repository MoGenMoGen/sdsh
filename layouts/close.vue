<template>
  <div id="container">
      <nuxt/>
  </div>
</template>
<script>

  export default {
    data() {
      return {

      };
    },
    async mounted() {

    },

    methods: {


      async getBanner(){
        let data = await this.api.getBanner()
        this.maList = data.ADPOSPC006
        this.wxCode = this.maList.length > 0 ? this.maList[0].imgUrl : ''
        this.ddCode = this.maList.length > 1 ? this.maList[1].imgUrl : ''
        this.bgUrl = data.bannerBg[0].imgUrl
        let logo = await this.api.getAdr('pcLogo')
        this.logo = logo[0].imgUrl
      },
      getWidth() {
        let width = document.body.clientWidth;
        if (width < 1000) {
          this.width = 1000;
          this.bWidth = 1000;
        }
        if (width >= 1000 && width <= 1200) {
          this.width = width;
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
            type: "warning"
          });
          return;
        }
        this.$router.push({
          path: "/newList",
          query: {
            key: this.key,
            time: new Date().getTime()
          }
        });
      },
      async getNav() {
        let qry = this.query.new();
        this.query.toW(qry, "pid", 0, "EQ");
        this.query.toO(qry, "sort", "asc");
        let data = await this.api.getMenuNav(
          encodeURIComponent(this.query.toJsonStr(qry))
        );
        this.navList.push(...data);
      },
      toFeedback(url){
        this.$router.push(url);
      },
      toPage(item) {
        if (item.url) {
          this.$router.push("/");
        } else {
          this.currentNav = item.nm;
          this.$router.push({
            path: "/newList",
            query: {
              id: item.id,
              nm: item.nm
            }
          });
        }
      },
      changeRoute(){
        if(window.location.pathname=='/zjfzol/'){
          this.ifHome = true
        }else {
          this.ifHome = false
        }
        if(window.location.pathname.indexOf('/topic')>-1 || window.location.pathname.indexOf('/webMap')>-1 || window.location.pathname.indexOf('/declare')>-1){
          //专题详情 网站地图 申报 不显示banner
          this.ifBanner = false
        }else {
          this.ifBanner = true
        }
        if(window.location.pathname.indexOf('/topic')>-1 ){
          this.ifTopic = true
          document.getElementsByTagName('html')[0].style.height='100%'
        }else {
          this.ifTopic = false
        }
        if(window.location.pathname.indexOf('/declare')>-1 ){
          this.declare = true
          document.getElementsByTagName('html')[0].style.height='100%'
        }else {
          this.declare = false
        }
      }
    },
    components: {

    },
    watch: {


    },
  };
</script>
<style lang="less">
  /*body{*/
    /*background: #009ad6!important;*/
  /*}*/
  .el-popover{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    min-width: auto;
    padding: 0;
    img{
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
  .topic{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .content-link{
      overflow: auto;
      height: 100%;
    }
  }
  #container {
    /*background: url("./img/bg.png") repeat center;*/
    /*display: flex;*/
    /*display: -webkit-flex;*/
    /*flex-direction: column;*/
    /*width: 100%;*/
    /*height: 100%;*/
    #header {
      border-bottom: 1px solid #e1e1e1;
      width: 100%;
      height: auto;
      .header-top {
        width: 100%;
        background-color: #1f65de;
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
            height: 40px;
            position: absolute;
            right: 0;
            top: 0;
            padding-top: 8px;
            text-indent: 100px;

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
          margin: 0 auto;
          display: flex;
          display: -webkit-flex;
          /*justify-content: flex-end;*/
          padding: 0 1%;
          align-items: center;
          box-sizing: border-box;
          height: 100%;
          >div{
            flex: 1;
            display: flex;
            display: -webkit-flex;
            justify-content: flex-end;
            height: 100%;
          }
          .wxDD{
            margin-top: 20px;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            color: #ffffff;
            margin-left: 40px;
            cursor: pointer;
            img{
              margin-right: 5px;
            }
          }
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
    .content-link {
      flex: 1;
      width: 100%;

      /*display: flex;*/
      /*display: -webkit-flex;*/
      /*flex-flow: row nowrap;*/
      /*justify-content: space-between;*/
    }
    .contentDeclar{
      height: 100%;
    }
  }
</style>
