<template>
  <div class="example-list">
    <!--<div class="choose" v-if="keyWord">-->
      <!--&lt;!&ndash;<div><b>排序：</b><span :class="{active:byTm==item.cd}" v-for="item in sortList" :key="item.cd" @click="changeSort(item.cd)">{{item.nm}}</span></div>&ndash;&gt;-->
      <!--<div><b>搜索位置：</b><span :class="{active:byTitle==item.cd}" v-for="item in matchList" :key="item.cd" @click="changeMatch(item.cd)">{{item.nm}}</span></div>-->
    <!--</div>-->
    <ul :class="{line:keyWord}" :style="{width:width+'px'}">
      <li v-for="item in list">
        <div class="nm">
          <div>
            <p :href="'/zjfzol/newList?detailId='+item.id" v-html="item.title" :title="item.title" @click="toDetail(item)" v-if="item.title.length<32"></p>
            <p :href="'/zjfzol/newList?detailId='+item.id" v-html="item.title.slice(0,32)+'...'" :title="item.title" @click="toDetail(item)" v-else></p>
          </div>
          <span>{{item.releTm}}</span>
        </div>
        <div class="listContent" v-if="keyWord" v-html="item.cont.slice(0,150)"></div>
        <div class="from" v-if="keyWord"><span v-html="item.newssrc"></span> - {{item.reletm}}</div>
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
  props: ["id", "keyWord",'width'],
  data() {
    return {
      byTm:0,//1按时间排序 0按相关度排序
      byTitle:0,//1标题匹配，0内容匹配
      sortList:[{
        nm:'相关度',
        cd:0
      },{
        nm:'时间',
        cd:1
      }],
      matchList:[{
        nm:'全文',
        cd:0
      },{
        nm:'标题',
        cd:1
      }],
      list: [],
      pageNo:1,
      pageSize: 20,
      total: 0
    };
  },
  created(){

    //
    // console.log(this.pageNo)
  },
  mounted() {
    this.pageNo = this.until.getQueryString('pageNo') ?  parseInt(this.until.getQueryString('pageNo')) : 1
    if (this.keyWord) {
      this.getSearchList();
    }
    if (this.id) {
      this.getList();
    }
  },
  watch: {
    keyWord() {
      if(this.keyWord){
        this.pageNo = 1;
        this.getSearchList();
      }

    },
    id() {
      if(this.id){
        // console.log("id变化");
        this.pageNo = 1;
        this.getList();
      }

    }
  },
  components: {},
  methods: {
    changeSort(cd){
      this.byTm = cd
      this.pageNo = 1
      this.getSearchList()
    },
    changeMatch(cd){
      this.byTitle = cd
      this.pageNo = 1
      this.getSearchList()
    },
    async getSearchList() {
      // this.query.toW(qry, "nm", this.keyWord, "LK");
      // this.query.toP(qry, this.pageNo,this.pageSize);
      let param = {
        cont: this.keyWord,
        current: this.pageNo,
        size: this.pageSize,
      };
      let data = await this.api.getListAll(param);
      data.records.forEach(item => {
        if(item.reletm){
          let year = new Date(item.reletm).getFullYear()
          let month = parseInt(new Date(item.reletm).getMonth())+1
          let day = new Date(item.reletm).getDate()
          item.reletm = year +'-'+month+'-'+day

        }
      });
      this.list = data.records;
      this.total = data.total;
    },
      async getList() {
      // console.log('getList')
          let param = {
              cids:this.id,
              current:this.pageNo,
              size:this.pageSize
          }
          let data = await this.api.getListAll(param);
          data.records.forEach(item => {
              item.releTm = item.releTm ? item.releTm.split(" ")[0] : "";
          });
          this.list = data.records;
          this.total = data.total;
      },

    close() {
      if (!this.id) {
        this.until.back();
      } else {
        this.detailId = "";
      }
    },
    handleCurrentChange(e) {
      this.pageNo = e;

      let url = this.until.changeQueryString('pageNo',e)
      // console.log(url)
      window.location.href = url;
      // if (this.keyWord) {
      //   this.getSearchList();
      // } else {
      //   this.getList();
      // }
    },
    toDetail(item) {
      this.$emit("getDetail", item);
    }
  }
};
</script>

<style scoped lang="less">
  @import url("../assets/css/init.less");
.example-list {
  .choose{
    width: 100%;
    >div{
      display: inline-block;
      padding-right: 50px;
      >b{
        color: @themeColor;
        padding-right: 10px;
      }
      span{
        cursor: pointer;
        margin-right: 10px;
      }
      span.active{
        color: #f23030;
        font-weight: bold;
      }
    }
  }
  .line {
    li {
      border-bottom: 1px solid #e4e4e4;
      padding-bottom: 20px;
      margin: 20px 0;
      .nm>div{
        p{
          font-weight: bold;
        }
      }
      .from{
        padding-top: 10px;
        color: #999999;
        span{
          color: @themeColor;
        }
      }
    }
  }
  > ul li {
    .nm {
      height: 40px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      color: #333;
      >div{
        flex: 1;
        position: relative;
        padding-left: 12px;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        p {
          display: inline-block;
          /*display: -webkit-box;*/
          /*-webkit-box-orient: vertical;*/
          /*-webkit-line-clamp: 1;*/
          /*overflow: hidden;*/
          cursor: pointer;
          max-width: 95%;
          &:hover {
            text-decoration: underline;
            color: #0d6bb5;
          }
        }
      }

      >div:before {
        position: absolute;
        left: 0;
        top: 20px;
        transform: rotateX(-50%);
        display: block;
        content: "";
        width: 3px;
        height: 3px;
        background: #333;
      }
    }
    .listContent {
      color: #333;
      /*cursor: pointer;*/
    }
  }
  .pageNo {
    clear: both;
    width: 100%;
    padding-top: 20px;
  }
}
</style>
