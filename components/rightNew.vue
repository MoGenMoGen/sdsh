<template>
  <div class="rightNew">
    <p class="title" v-show="newsShow">最新新闻</p>
    <ul v-if="newsShow" class="newList">
      <li @click="toDetail(item)" :href="'/zjfzol/newList?detailId='+item.id" v-for="item in rightList">
        <span></span>
        <p :title="item.title" v-if="item.title && item.title.length>15">{{item.title.slice(0,15)+'...'}}</p>
        <p :title="item.title" v-else>{{item.title}}</p>
      </li>
    </ul>
    <!--<ul class="imgList">-->
      <!--<li  v-for="item in rightList2">-->
        <!--<a :href="item.locUrl" target="_blank">-->
          <!--<img :src="item.imgUrl"/>-->
        <!--</a>-->
      <!--</li>-->
    <!--</ul>-->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props:['newsShow'],
  data() {
    return {
        rightList:[{
            title:'标题标题标题标题标题标题标题标题标题标题',
        },{
            title:'标题',
        },{
            title:'标题',
        },{
            title:'标题',
        }],
        // rightList2:[]
    };
  },
  components: {},
    mounted(){
      this.getList()
        // this.getBanner()
    },
    methods:{
        toDetail(info){

            this.$router.push({path:'/newList',query:{
                    detailId:info.id,
                    time:new Date().getTime()
                }})
        },
        async getList(){
          //置顶新闻
          let news1 = await this.api.getListAll({
            current:1,
            size:10
          })
          this.rightList = news1.records


        },
        // async getBanner(){
        //     this.rightList2 = await this.api.getAdr('ADPOS.PC005')
        // },
        toPage(url){
            this.until.href(url)
        }
    }
};
</script>

<style scoped lang="less">
  @import url("../assets/css/init.less");
  .rightNew{
    width: 100%;
    .title{
      background: #2d8ce1;
      width: 100%;
      color: #ffffff;
      text-indent: 20px;
      padding: 10px 0;
      box-sizing: border-box;
    }
    ul.newList{
      padding-top: 20px;
      padding-bottom: 20px;
      li{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        height: 40px;
        line-height: 40px;

        span{
          display: block;
          width: 3px;
          height: 3px;
          background: #333;
          margin-right: 5px;
        }
        p{
          height: 40px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          cursor: pointer;
          &:hover{
            text-decoration: underline;
            color: @themeColor;
          }
        }
      }
    }
    ul.imgList{
      li{
        margin-bottom: 10px;
        cursor: pointer;
        img{
          width: 100%;
          height: auto;
        }
      }
    }
  }
</style>
