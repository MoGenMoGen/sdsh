<template>
  <div class="example-list">
    <ul :style="{width:width+'px'}">
      <li v-for="item in list" @click="toDetail(item)" :href="'/zjfzol/newList?detailId='+item.id" >
        <div class="img" :style="{width:widthLi+'px',height:widthLi*1.36+'px'}" >
          <img :src="item.img" />
        </div>
        <p>{{item.title}}</p>
        <!--<div class="nm">-->
          <!--<p v-html="item.title"></p>-->
          <!--<span>{{item.crtTm}}</span>-->
        <!--</div>-->
      </li>
    </ul>
    <div class="pageNo">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['width'],
  data() {
    return {
      list: [],
      pageNo: 1,
      pageSize: 12,
      total: 0,

    };
  },
  created(){
    // this.pageNo = this.until.getQueryString('pageNo') ?  parseInt(this.until.getQueryString('pageNo')) : 1
    // this.getList()
  },
  mounted() {
    // this.pageNo = this.until.getQueryString('pageNo') ?  parseInt(this.until.getQueryString('pageNo')) : 1
    // console.log(this.pageNo)

      this.getList();
  },
  watch: {

  },
  computed:{
    widthLi(){
      return this.width*0.31
    }
  },
  components: {},
  methods: {

      async getList() {
          let param = {
              pageNo:this.pageNo,
              pageSize:this.pageSize,
              siteId:1,
              cid:this.until.getQueryString('cid')
          }

          let data = await this.api.eZineList(param);
          data.data.list.forEach(item=>{
              item.crtTm = item.crtTm ? item.crtTm.split(' ')[0] : ''
            item.img = item.imgUrl ? item.imgUrl.split(',')[0] : ''
          })
          this.list = data.data.list;
          this.total = data.page.total;
      },
    // async getList() {
    //   let qry = this.query.new();
    //   this.query.toW(qry, "catId", this.id, "EQ");
    //   this.query.toP(qry, this.pageNo, this.pageSize);
    //   let data = await this.api.getList(
    //     encodeURIComponent(this.query.toJsonStr(qry))
    //   );
    //   data.data.list.forEach(item => {
    //     item.releTm = item.releTm ? item.releTm.split(" ")[0] : "";
    //   });
    //   this.list = data.data.list;
    //   this.total = data.page.total;
    // },

    close() {
      if (!this.id) {
        this.until.back();
      } else {
        this.detailId = "";
      }
    },
    handleCurrentChange(e) {
      this.pageNo = e;
      this.getList()
      // let url = this.until.changeQueryString('pageNo',e)
      // console.log(url)
      // window.location.href = url;

    },
    toDetail(item) {
      if(item.types==1){
        let url = '../eZine/eZineDetail.html?id='+item.id
        console.log(url)
        this.until.href(url)
      }else if(item.types==2){
        this.until.href(item.pdfUrl)
      }

    }
  }
};
</script>

<style scoped lang="less">
.example-list {
  .line {
    li {
      border-bottom: 1px solid #e4e4e4;
      padding-bottom: 20px;
      margin: 20px 0;

    }
  }
  >ul{
    overflow: hidden;
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
  .pageNo {
    clear: both;
    width: 100%;
    padding-top: 20px;
  }
}
</style>
