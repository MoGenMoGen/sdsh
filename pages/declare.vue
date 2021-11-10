<template>
  <div id="declare">
      <!--<img :src="img" :style="{width:bWidth+'px'}"/>-->
      <div class="btn">
          <p @click="toPage('https://kp.zjfzol.com.cn/declareWeb/zj_first_Declare.jsp')">企业登录</p>
          <!--<p @click="toPage('../../declare/1.html')">企业登录</p>-->
          <p @click="toPage('https://kp.zjfzol.com.cn/jsp/default/login/login_in.jsp')">司法行政机构登录</p>
      </div>
  </div>
</template>
<script>
    export default {
       props:['bWidth','width'],
        data() {
            return {
                img:'http://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/pfyf/11dd1d1df6534d9aa742b2a7bb029471.png',
                id:0,
                type:0,
                info:{},
                file:'topicComp',
                comp:null,
                html: ''
            };
        },
        mounted() {

            this.getImg()
        },

        components: {
        },
        watch: {

        },
        methods: {
            getImg(){
              this.api.getAdr('declare',1).then(res=>{
                  this.img = res[0].imgUrl
              })
            },

            toPage(url){
                // window.location.href = url
                // this.until.href(url)
                window.open(url)
            }
        }
    };
</script>
<style lang="less" scoped>
  @base: 18rem;
  @import url("../assets/css/init.less");
    #declare{
      margin: 0 auto;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
      background: url("http://oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/pfyf/bbfc4fd2309448878fffd4c2ae5bfb70.jpg") top center no-repeat;
      background-size: cover;
      position: relative;
        .btn{
            position: absolute;
            top:45%;
          left:50%;
          transform: translateX(-50%);
            p{
              width: 397px;
              height: 68px;
                background: #6077ef;
                border-radius: 5px;
                color: #ffffff;
                line-height: 68px;
                font-size: 30px;
              font-weight: bold;
                text-align: center;
                cursor: pointer;
              margin-bottom: 46px;
            }
        }
    }
</style>
