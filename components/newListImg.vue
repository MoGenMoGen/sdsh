<template>
  <div id="newListImg">
    <div class="qr" v-show="qrImg" @click ="qrImg=''">
      <img :src="qrImg" @click.stop=""/>
    </div>
      <ul>
        <li v-for="(item,index) in list" @click="qrImg=item.qrCode">
          <div class="img">
            <img  :src="item.imgUrl"
                      class="el-images"
                      :ref="'img'+index"
           :style="{width:widthLi+'px',height:widthLi+'px'}"/>
          </div>
          <p>{{item.name}}</p>
        </li>
      </ul>
      <div class="pageNo">
        <!--<el-pagination-->
                <!--@current-change="handleCurrentChange"-->
                <!--:current-page="pageNo"-->
                <!--:page-size="pageSize"-->
                <!--layout="total, prev, pager, next, jumper"-->
                <!--:total="total">-->
        <!--</el-pagination>-->
      </div>

  </div>
</template>
<script>
    export default {
        props:["id","type",'width'],
        data() {
            return {
              qrImg:'',
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
        this.getList()
      },
        mounted() {
            // console.log('图片')


        },
        components: {},
        watch: {


        },
        computed:{
            widthLi(){
                return this.width*0.15
            }
        },
        methods:{
            async getList(){

                let data = await this.api.getMedia();
                this.list = data
              this.list.forEach((item, index) => {
                this.objectFitImages(this.$refs['img'+index])
                this.$set(this.list, index, item)
              })
            },


            close(){
                this.detailId = ''
            },

        }
    };
</script>
<style lang="less" scoped>
  @base: 18rem;
  @import url("../assets/css/init.less");
  #newListImg {
    .qr{
      position: fixed;
      width: 100vw;
      height: 100vh;
      left: 0;
      top:0;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.8);
      z-index: 1000;
      img{
        width: auto;
        max-width: 50%;
      }
    }
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
            width: 20%;
            float: left;
            margin-left: 4%;
            margin-bottom: 20px;

            .img{
              width: 100%;
              display: flex;
              display: -webkit-flex;
              align-items: center;
              justify-content: center;
              img{
                object-fit:cover;

              }
            }
            p{
              padding: 13px;
              height: 40px;
              text-align: center;
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
