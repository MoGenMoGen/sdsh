<template>
  <div id="newListImg">

      <ul>
        <li v-for="item in list" @click="toDetail(item)" :href="'/zjfzol/newList?detailId='+item.id" >
          <div class="img">
            <img :src="item.uploadUrl ? item.uploadUrl : item.coverUrl" :style="{width:widthLi+'px',height:widthLi+'px'}"/>
          </div>
          <p>{{item.nickname}}</p>
        </li>
      </ul>
      <!--<div class="pageNo">-->
        <!--<el-pagination-->
                <!--@current-change="handleCurrentChange"-->
                <!--:current-page="pageNo"-->
                <!--:page-size="pageSize"-->
                <!--layout="total, prev, pager, next, jumper"-->
                <!--:total="total">-->
        <!--</el-pagination>-->
      <!--</div>-->

  </div>
</template>
<script>
    export default {
        props:["id","type",'width'],
        data() {
            return {
                title: "法治文化",
                detailId:'',
                list:[],
                topList:[],
                pageNo:1,
                pageSize:9,
                total:0,
            };
        },
      created(){
        this.pageNo = this.until.getQueryString('pageNo') ?  parseInt(this.until.getQueryString('pageNo')) : 1

      },
        mounted() {
            console.log('抖音账号11')

            this.getList()
        },
        components: {},
        watch: {


        },
        computed:{
            widthLi(){
                return this.width*0.31
            }
        },
        methods:{
            async getList(){
                this.list = await this.api.getDouYinCount();

            },

            toDetail(item){

                this.$emit('setDYopenId',item)
            },
            close(){
                this.detailId = ''
            },
            handleCurrentChange(e){
              this.pageNo = e;

              let url = this.until.changeQueryString('pageNo',e)
              console.log(url)
              window.location.href = url;
            },
        }
    };
</script>
<style lang="less" scoped>
  @base: 18rem;
  @import url("../assets/css/init.less");
  #newListImg {

          .top{
            display: flex;
            display: -webkit-flex;
            margin-bottom: 20px;
            box-shadow: 2px 0px 1px 1px #dad8d9;
            .img{
              width: 63%;
              display: flex;
              display: -webkit-flex;
              img{
                width: auto;
                height: auto;
                max-width: 100%;
                max-height: 100%;
                margin: auto;
              }
            }

            p{
              flex: 1;

              position: relative;
              padding: 30px 20px;
              a{
                position: absolute;
                cursor: pointer;
                right: 10px;
                bottom: 10px;
                color: #ff3000;
              }
            }
          }
          >ul li{
            width: 31%;
            float: left;
            margin-right: 3.5%;
            margin-bottom: 20px;
            cursor: pointer;
            box-shadow: 0px 2px 1px 0px #dad8d9;

            &:nth-of-type(3n){
              margin-right: 0;
            }
            .img{
              width: 100%;
              display: flex;
              display: -webkit-flex;
              img{
                margin: auto;
                width: auto;
                height: auto;
                max-width: 100%;
                max-height: 100%;
              }
            }
            p{
              padding: 13px;
              height: 40px;
                line-height: 24px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
          }
          .pageNo{
            clear: both;
            width: 100%;
            padding-top: 20px;
          }
  }

</style>
