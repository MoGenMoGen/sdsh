<template>
  <div id="newListImg">
      <video-show v-if="videoShow" @close="close" :info="videoInfo" @changeVideo="changeVideo"></video-show>
      <ul>
        <li v-for="(item,index) in list" @click="toShow(item)">
          <div class="img">
              <p><img :src="play"/> </p>
            <img :src="item.cover" :style="{width:widthLi+'px',height:widthLi*400/300+'px'}"/>
          </div>
          <p>{{item.title}}</p>
        </li>
      </ul>
      <div class="pageNo">
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
      </div>

  </div>
</template>
<script>
    const videoShow = resolve => require(['@/components/videoShow.vue'],resolve)
    // import videoShow from '@/components/videoShow'
    import play from './img/play.png'
    export default {
        props:["id","type",'width'],
        data() {
            return {
                play,
                videoShow:false,
                title: "法治文化",
                detailId:'',
                list:[],
                topList:[],
                pageNo:1,
                pageSize:9,
                total:0,
                videoUrl:'',
                imgUrl:'',
                videoInfo:{},
                currentIndex:0,
            };
        },
      created(){
        // this.pageNo = this.until.getQueryString('pageNo') ?  parseInt(this.until.getQueryString('pageNo')) : 1
      },
        mounted() {

            this.getList()
        },
        components: {
            videoShow
        },
        watch: {
            id(){
                this.pageNo = 1
                this.getList()
                if(this.type===3){
                    this.getTopList()
                }
            }
        },
        computed:{
            widthLi(){
              return this.width*0.31
          }
        },
        methods:{

            close(){
              this.videoShow = false
            },
            changeVideo(type){
                if(type==='pre' && this.currentIndex>0){
                    this.currentIndex--
                    this.videoInfo = this.list[this.currentIndex]
                }
                if(type==='next' && this.currentIndex<this.list.length-1){
                    this.currentIndex++
                    this.videoInfo = this.list[this.currentIndex]
                }
            },
            async getList(){
                let qry = this.query.new();
                this.query.toW(qry, "openId", this.id, "EQ");
                this.query.toP(qry, this.pageNo,this.pageSize);
                let data = await this.api.getDouYiList(
                    encodeURIComponent(this.query.toJsonStr(qry))
                );
                this.list = data.data.list
                this.total = data.page.total

            },


            toShow(item){
                this.api.douYinRead(item.id).then(()=>{
                    window.open(item.shareUrl)

                })
                // this.currentIndex = index
                // this.videoInfo = this.list[index]
                // this.videoShow = true
            },
            handleCurrentChange(e){
              this.pageNo = e;
              this.getList()
              // let url = this.until.changeQueryString('pageNo',e)
              // console.log(url)
              // window.location.href = url;
            },
        }
    };
</script>
<style lang="less" scoped>
  @base: 18rem;
  @import url("../assets/css/init.less");
  #newListImg {
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
                position: relative;
                p{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    display: -webkit-flex;
                    img{
                        margin: auto;
                    }
                }
              img{
                margin: auto;
                width: 50px;
                height: 50px;
              }
            }
            >p{
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
