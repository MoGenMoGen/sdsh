<template>
  <div id="newList">
    <div class="header" style="padding-top: 70px;background: url(http://img.pazjw.gov.cn/panbw/images/header_bg.png) top center no-repeat;"></div>
    <div class="layout w1000">
      <!--S 导航-->
      <div class="nav w1000">
        <ul>
          <li><a href="http://www.panb.gov.cn/">首页</a></li>
          <li class="line-bor">|</li>
          <li><a href="http://www.panb.gov.cn/zhengfayaowen">政法要闻</a></li>
          <li class="line-bor">|</li>
          <li><a href="/zjfzol/newList2?id=5070921522893824&nm=县区动态">县区动态</a></li>
          <li class="line-bor">|</li>
          <li><a href="http://www.panb.gov.cn/pinganningbo">平安宁波</a></li>
          <li class="line-bor">|</li>
          <li><a href="http://www.panb.gov.cn/fazhiningbo">法治宁波</a></li>
          <li class="line-bor">|</li>
          <li><a href="http://www.panb.gov.cn/duiwujianshe">队伍建设</a></li>
          <li class="line-bor">|</li>
          <li><a href="http://www.panb.gov.cn/zhengfawenhua">政法文化</a></li>
          <li class="line-bor">|</li>
          <li><a href="/zjfzol/newList2?id=5070927472399360&nm=宁波法学">宁波法学</a></li>
          <li class="line-bor">|</li>
          <li><a href="http://www.panb.gov.cn/zhengcefagui">政策法规</a></li>
          <li class="line-bor">|</li>
          <li><a href="http://www.panb.gov.cn/bumenyujuesuangonggao">预决算公告</a></li>
          <li class="line-bor">|</li>
          <li><a href="http://www.panb.gov.cn/shijiuda/sjdpags">改革专栏</a></li>


        </ul>
      </div>
      <!--E 导航-->
      <!--S 县市区-->
      <div class="nav-menu">
        <a href="http://www.panb.gov.cn/" target="_blank"><b>宁波市 </b></a>
        <a href="http://zt.haishu.gov.cn/pahs/index.aspx" target="_blank"><b>海曙区 </b></a>
        <a href="http://pajbw.pazjw.com.cn/" target="_blank"><b>江北区</b></a>
        <a href="http://www.bl.gov.cn/doc/bmjd/sfj/index.shtml" target="_blank"><b>北仑区</b></a>
        <a href="http://www.zh.gov.cn/col/col83653/index.html" target="_blank"><b>镇海区</b></a>
        <a href="http://ningbopayz.com/Page" target="_blank"><b>鄞州区</b></a>
        <a href="http://payyw.pazjw.com.cn/" target="_blank"><b>余姚市</b></a>
        <a href="http://pacx.cxnews.cn/" target="_blank"><b>慈溪市</b></a>
        <a href="http://pafh.fh.gov.cn/index.html" target="_blank"><b>奉化区</b></a>
        <a href="http://xs.cnnb.com.cn/pdzx/paxs/" target="_blank"><b>象山县</b></a>
        <a href="http://panh.nhnews.cn/" target="_blank"><b>宁海县</b></a>
      </div>
      <!--E 县市区-->
      <div class="w1000">
        <!--S 左边-->
        <div class="list_right mt10">
          <div class="list_nave" style="margin:0px;padding-left:10px;border: 1px solid #DBDBDB;line-height:30px;overflow: hidden;">
            <a href="http://www.panb.gov.cn/" target="_blank" title="平安宁波网" class="CurrChnlCls">平安宁波网</a>&nbsp;&gt;&nbsp;<a @click="toList" class="CurrChnlCls">{{this.nm}}</a>
          </div>
          <div class="list_content1" v-if="!detailId">
            <ul class="label_ul_b">
              <li v-for="item in list" :key="item.id" class="CurrChnlCls" @click="toDetail(item.id)"><p>{{item.nm}}</p><span>[{{item.releTm}}]</span></li>
            </ul>
            <div id="page">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
          <div class="gov_article_content1 mtop" style="background:none;" v-else>
            <div class="view-title">{{info.nm}}</div>
            <div class="view-subTitle" style="font-size:20px;"></div>
            <div class="view-info">
              发布：{{info.releTm}}
              来源：{{info.newsSrc}} &nbsp;作者: &nbsp;{{info.author}}
              编辑：{{info.editor}}
            </div>

            <div class="main-content">
              <div  v-html="info.cont" v-if="info.cont"></div>
            </div>
          </div>
        </div>
        <!--E 左边-->
      </div>
    </div>

    <!--E 主体-->
    <div class="clear"></div>
    <!--S 底部-->
    <div class="footer">
      <ul class="w1000">
        <p><span id="_ideConac"><a href="http://bszs.conac.cn/sitename?method=show&amp;id=08598B8A30D82C4EE053012819ACBA02" target="_blank"><img id="imgConac" vspace="0" hspace="0" border="0" src="@/img/red.png" data-bd-imgshare-binded="1"></a></span><script src="./平安宁波__平安宁波网-宁波市委政法委门户网站_files/CA121870000604175190002.js.下载" type="text/javascript"></script><span id="_ideConac"></span></p>
        <p>主办：中共宁波市委政法委员会、宁波市法学会 </p>
        <p> 联系地址：宁波市江东区宁穿路2001号 邮政编码:315066 技术支持：<a href="http://www.zjfzol.com.cn/">浙江法制报社</a></p>
        <p>Copyright © 浙ICP备14028497号-1 网站邮箱：panb2014@sina.com </p>
        <p><a target="blank" href="http://www.beian.miit.gov.cn/" class="wljc">浙ICP备14028497号-1</a></p>
      </ul>
    </div>
  </div>
</template>
<script>

  export default {
    layout:'close',
    head(){
      return{
        title:this.title,
        meta:[{
          'name':'keywords',
          'content': this.webKeyWord
        },{
          'name':'description',
          'content': this.webContent
        }]
      }
    },
    data() {
      return {
        type: 0,
        title: "法治文化",
        webKeyWord:'',
        webContent:'',
        id: "",
        nm:'',
        navName: "",
        currentMenu: {
          nm:'',
          type:null,
        },
        menuList: [],
        smallMenuList: [],
        list: [],
        pageNo: 1,
        pageSize: 20,
        total: 0,
        detailId: "",
        DYaccout:'',
        DYopenId:'',//抖音openId
        info:{}, //新闻详情
      };
    },
    created(){
    },
    mounted() {
      this.width = this.until.getWidth().width
      window.onresize = () => {
        return (() => {
          this.getWidth()
        })();
      };
      this.getInfo();
    },
    computed:{
      rightWidth() {
        // console.log(this.width)
        let rWidth = this.menuList.length>0 ? this.width*0.86 : this.width
        return (rWidth-40)*0.75-40
      }
    },
    async asyncData(context){
      return
      if(process.client){
        return
      }

      let urlArr = []
      let info = {}
      let title = ''
      let webKeyWord = ''
      let webContent = ''
      let newList = []
      let detailId = context.query.detailId ? context.query.detailId : ''



      if(detailId){//详情
        // info = {}
        info = await context.app.api.getNewDetail(detailId);
        title = info ? info.nm:''
        webContent = info ? info.summary : ''
      }
      //列表
      if(context.query.nm && context.query.id){
        title = '山东商会 - '+context.query.nm
        let param = {
          catId:context.query.id,
          siteId:1,
          pageNo:context.query.pageNo ? context.query.pageNo : 1,
          pageSize:20
        }
        newList = await context.app.api.getAllList(param);
        newList.data.list.forEach(item=>{
          urlArr.push(context.app.hostUrl+'/zjfzol/newList2?detailId='+item.id)
        })
      }

      return{
        title : title,
        webKeyWord : webKeyWord,
        webContent : webContent,
        info : info,
        newList:newList,
        urlArr:urlArr,
      }
    },
    components: {

    },
    watch: {
      $route(to) {
        this.getInfo();
      }
    },

    methods: {
      handleCurrentChange(e){
        this.pageNo = e;

        let url = this.until.changeQueryString('pageNo',e)
        console.log(url)
        window.location.href = url;

        // this.pageNo = e
        // this.getList()
      },
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
        }

      },
      toHome() {
        this.$router.push({ path: "/" });
      },
      async getInfo() {

        this.detailId = this.$route.query.detailId ? this.$route.query.detailId : '';
        if (this.detailId) {
          //详情过来的
          this.info = await this.api.getNewDetail(this.detailId);
          this.info.cont = this.info.cont.replace("宋体",'微软雅黑')
          this.info.cont = this.info.cont.replace(/<img[^>]*>/gi, function (match, capture) {
            return match.replace(/(<img[^>]*)(\/?>)/gi, "$1style='max-width:100%;height:auto;' $2")
            // return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="max-width:100%;height:auto;"') // 替换style

          })

          if(this.info.newsSrc.indexOf('来源')=='-1'){
            this.info.newsSrc = '来源：'+this.info.newsSrc
          }
          // if(this.info.editor.indexOf('编辑')=='-1'){
          //   this.info.editor = '(责任编辑：'+this.info.editor+')'
          // }
          this.nm = this.info.catNm
          this.id = this.info.catId
          this.detailId = this.info.id;
          return;
        }
        if(this.$route.query.nm && this.$route.query.id){


          this.title = '浙江法治在线 - '+ this.$route.query.nm
          this.id = this.$route.query.id;
          this.nm = this.$route.query.nm

        }

        // this.id = this.$route.query.id ? this.$route.query.id : "";
        if (this.id) {
          this.getList();
        }
      },
      async getList(){
        this.pageNo = this.until.getQueryString('pageNo') ?  parseInt(this.until.getQueryString('pageNo')) : 1

        let qry = this.query.new();
        this.query.toW(qry, "catId", this.id, "EQ");
        this.query.toP(qry, this.pageNo,this.pageSize);
        let data = await this.api.getList(
          encodeURIComponent(this.query.toJsonStr(qry))
        );
        this.list = data.data.list
        this.list.forEach(item=>{
          item.releTm = item.releTm? item.releTm.split(' ')[0] : ''
        })
        this.total = data.page.total
      },
      toDetail(id){
        this.$router.push({
          path: "/newList2",
          query: {
            detailId: id,
            time:new Date().getTime()
          }
        });
      },
      toList() {

          let param ={
            nm: this.nm,
            id:this.id,
          }


        this.$router.push({
          path: "/newList2",
          query: param
        });
      }
    }
  };
</script>
<style lang="less" scoped>
  @base: 18rem;
  @import url("../assets/css/init.less");
  /*body{background:#f0f0f0 url(../images/head_bg.jpg) no-repeat center top;font-size: 12px;font-family: "SimSun";}*/

  body {
    background: #f0f0f0 url('/img/header_bg.png') no-repeat center top;
    font-size: 12px;
    font-family: "SimSun";
  }

  a,
  a:hover,
  a:link,
  a:active,
  a:visited {
    color: #333;
  }
  .CurrChnlCls{
    cursor: pointer;
  }
  .w1000 {
    margin: auto;
    width: 1000px;
  }

  .w990 {
    margin: auto;
    width: 990px;
  }

  input {
    outline: none
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .mt5 {
    margin-top: 5px;
  }

  .mt10 {
    margin-top: 10px;
  }

  .mt12 {
    margin-top: 12px;
  }

  .mt15 {
    margin-top: 15px;
  }

  .mt18 {
    margin-top: 18px;
  }

  .mt20 {
    margin-top: 20px;
  }

  .mt85 {
    margin-top: 85px;
  }

  .mr10 {
    margin-right: 10px;
  }

  .mb80 {
    margin-bottom: 80px;
  }

  .ml5 {
    margin-left: 5px;
  }

  .ml10 {
    margin-left: 10px;
  }

  .ml12 {
    margin-left: 12px;
  }

  .ml20 {
    margin-left: 20px;
  }

  .ml30 {
    margin-left: 30px;
  }

  .pl30 {
    padding-left: 30px;
  }

  .overHide {
    overflow: hidden;
  }

  .hr {
    border-bottom: 1px dashed #CCCDCF;
    margin: 5px 0;
    clear: both;
  }

  .label_ul_b {
    padding: 5px;
    li{
      display: flex;
      display: -webkit-flex;
      line-height: 30px;
      span{
        flex: 1;
        text-align: right;
      }
      p:hover{
        text-decoration: underline;
      }
    }
  }


  .header {
    height: 260px;
  }

  .header .logo {
    padding: 80px 0 0 65px;
  }

  .layout {
    padding: 5px;
    background: #fff;
    overflow: hidden;
  }

  .nav {
    height: 41px;
    background: url('../img/nav_bg.png') repeat-x;
  }

  .nav ul {
    padding: 0 0 0 5px;
  }

  .nav li {
    float: left;
    font-size: 14px;
    font-family: "MicroSoft YaHei";
    font-weight: bold;
    line-height: 41px;
    color: #fff;
    padding: 0 15px;
    overflow: hidden;
  }

  .nav li.line-bor {
    width: 1px;
    height: 41px;
    background: url('../img/nav_bor.png') no-repeat;
    text-indent: -99999px;
    padding: 0;
  }

  .nav li a {
    color: #fff;
  }

  .nav a:hover,
  .nav a:link,
  .nav a:visited {
    color: #fff;
  }

  .nav-menu {
    height: 35px;
    background: #999;
    line-height: 35px;
    padding-left: 10px;
  }

  .nav-menu span {
    color: #fff;
    padding: 0 5px;
  }

  .nav-menu a {
    color: #0b61a9;
    padding: 0 5px;
  }

  .layout .top {
    border: 1px #ccc solid;
    text-align: center;
  }

  .layout .top .h2 {
    font: 32px impact;
    font-weight: 900;
    text-align: center;
    padding: 10px 0;
  }

  .layout .top .h2 a {
    color: #7f0101;
  }

  .layout .top .h3 {
    font-size: 14px;
    font-weight: normal;
    padding-bottom: 10px;
  }

  .layout .flashNews {
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: #ccc;
    padding: 10px;
  }

  .layout .flashNews .flash {
    width: 610px;
    height: 390px;
  }

  .layout .flashNews .news {
    width: 345px;
  }


  .list_content1{
    padding: 10px;
    border: #dedede 1px solid;
    border-top: #dedede 0px solid;
    overflow: hidden;
    background-color: #ffffff;
  }


  .footer {
    width: 100%;
    background: #ac2024;
    text-align: center;
  }

  .footer ul {
    padding: 20px 0;
  }

  .footer p {
    color: #fff;
    font-family: Arial, "SimSun";
  }

  .footer a {
    color: #fff;
  }

  .gov_article_content1 {
    border: 1px #ddd solid;
    padding: 10px;
    border-top: 0;
  }

  .gov_article_content1 .view-title {
    font-size: 24px;
    font-weight: bolder;
    color: #2b2b2b;
    margin: 20px 0px 15px 0px;
    text-align: center;
    line-height: 30px;
  }

  .gov_article_content1 .view-subTitle {
    font-size: 20px;
    font-weight: normal;
    color: #2b2b2b;
    margin: 20px 0px 15px 0px;
    text-align: center;
    line-height: 30px;
  }

  .gov_article_content1 .view-info {
    font-size: 12px;
    color: #2b2b2b;
    text-align: center;
  }

  .gov_article_content1 .main-content {
    margin: 10px 15px 10px;
    overflow: hidden;
    line-height: 180%;
    font-size: 14px;
  }

  .gov_article_content1 .main-content p {
    padding-top: 10px;
  }

</style>
