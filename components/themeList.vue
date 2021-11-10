<template>
  <div id="themeList">
      <ul>
        <li v-for="item in list" >
          <div class="img" :style="{width:widthLi+'px',height:widthLi+'px'}">
              <img :src="item.fmImg"
                   class="el-images"
                   :ref="'img'+index"
              />
          </div>
          <p>{{item.title}}</p>
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
        props:['width'],
        data() {
            return {
                list:[],
                pageNo:1,
                pageSize:9,
                total:0,
            };
        },
      created(){
        this.pageNo = this.until.getQueryString('pageNo') ?  parseInt(this.until.getQueryString('pageNo')) : 1
        console.log(this.pageNo)
      },
        mounted() {
            this.getList()
        },
        components: {},
        computed:{
            widthLi(){
                return this.width*0.234
            }
        },
        watch: {

        },
        methods:{

            async getList(){
                let qry = this.query.new();
                this.query.toW(qry, "themeId", 1, "EQ");
              // this.query.toO(qry,'crtTm','desc')
                this.query.toP(qry, this.pageNo,this.pageSize);
                let data = await this.api.themeList(encodeURIComponent(this.query.toJsonStr(qry)));
                this.list = data.data.list
                this.list.forEach((item, index) => {
                  this.objectFitImages(this.$refs['img'+index])
                  this.$set(this.list, index, item)
                })
                this.total = data.page.total
            },

            toDetail(item){
              // let url = this.hostUrl+'/theme/column/api/template/show2?id=' + item.id
              //   window.open(url)
                this.$router.push({
                    path: "/topic",
                    query: {
                        id: item.id,
                    }
                });
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
  #themeList {


          >ul li{
            width: 23.4%;
            float: left;
            margin-right: 2.1%;
            margin-bottom: 20px;
            /*cursor: pointer;*/
            /*box-shadow: 0px 2px 1px 0px #dad8d9;*/

            &:nth-of-type(4n){
              margin-right: 0;
            }
            .img{
              width: 100%;
              display: flex;
              display: -webkit-flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              overflow: hidden;
              img{
                margin: auto;
                /*width: auto;*/
                /*height: auto;*/
                /*max-width: 100%;*/
                /*max-height: 100%;*/
                object-fit:contain;
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
              text-align: center;
            }
          }
          .pageNo{
            clear: both;
            width: 100%;
            padding-top: 20px;
          }
  }

</style>
