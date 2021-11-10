<template>
  <div id="footer" :style="{ width: bWidth + 'px' }">
    <!-- <div id="cnzz">
      <a
        href="https://www.cnzz.com/stat/website.php?web_id=1278902410"
        target="_blank"
        title="站长统计"
        ><img
          border="0"
          hspace="0"
          vspace="0"
          src="https://icon.cnzz.com/img/pic.gif"
      /></a>
    </div> -->
    <!--<span id="cnzz_stat_icon_1278902410" class="cnzz"><a href="https://www.cnzz.com/stat/website.php?web_id=1278902410" target="_blank" title="站长统计"><img border="0" hspace="0" vspace="0" src="https://icon.cnzz.com/img/pic.gif"></a></span>-->
    <div class="footer-wrap" :style="{ width: width + 'px' }">
      <!--<img src="http://zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web2747/site/picture/0/1907161758004998510.png"/>-->
      <!--<img :src="item.imgUrl"  v-for="(item,index) in img" :key="index" @click="toPage(item.locUrl)" v-if="index<1"/>-->
      <p>举办单位： 宁波市山东商会 业务联系：0574—87091616</p>
      <p>商会地址：宁波市翔云北路99号9号楼10层1001室</p>
      <p>宁波市山东商会会版权所有</p>
      <p>TCP/IP备案： 浙ICP备17039227号-1</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  props: ["width", "bWidth"],
  data() {
    return {
      // img:[],
    };
  },
  mounted() {
    // this.cnzz()
    this.getImg();
  },
  methods: {
    async getImg() {
      // this.img = await this.api.getAdr('PAGOFFICE')
    },
    toPage(url) {
      this.until.href(url);
    },
    toWebMap() {
      this.$router.push({
        path: "/webMap",
      });
    },
    cnzz() {
      var cnzz_protocol =
        "https:" == document.location.protocol ? "https://" : "http://";
      // document.write(unescape("%3Cspan id='cnzz_stat_icon_1278902410'%3E%3C/span%3E%3Cscript src='"+cnzz_protocol+"+v1.cnzz.com/z_stat.php%3Fid%3D1278902410%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"))
      const script = document.createElement("script");
      let html = `document.write(unescape("%3Cspan id=\'cnzz_stat_icon_1278902410\'%3E%3C/span%3E%3Cscript src=\'${cnzz_protocol}v1.cnzz.com/z_stat.php%3Fid%3D1278902410%26show%3Dpic\' type=\'text/javascript\'%3E%3C/script%3E"))`;
      script.language = "JavaScript";
      script.innerHTML = html;
      // document.getElementById('cnzz').appendChild(script)
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/init.less");
#cnzz {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -120%);
  bottom: 5px;
}

#cnzz_stat_icon_1278562941 {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -120%);
  bottom: 5px;
}
@base: 58rem;
#footer {
  position: relative;
  width: 100%;
  height: 160px;
  min-width: max-content;
  min-width: -moz-max-content;
  // background: url("./img/底部背景.png") no-repeat top center;
  // background-size: cover;
  background: #0C76B3;
  border-top: 1px solid #ddd;
  color: #666;
  .footer-wrap {
    width: 100%;
    min-width: 1000px;
    margin: 20px auto;
    position: relative;
    > img {
      position: absolute;
      left: 120px;
    }
    p {
      text-align: center;
      line-height: 30px;
      font-size: 16px;
      color: #FFFFFF;
      span {
        padding: 0 10px;
      }
    }
    a:hover {
      cursor: pointer;
    }
  }
}
</style>
<style>
.cnzz {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 5px;
}
</style>
