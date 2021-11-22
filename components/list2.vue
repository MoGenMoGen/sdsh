<template>
  <!--包含图片的列表  -->
  <div class="list">
    <div class="item" v-for="(item, index) in List" :key="index">
      <div class="left" v-if="item.imgUrl">
        <img :src="item.imgUrl" alt="" />
      </div>
      <div class="right">
        <div class="title">{{ item.title }}</div>
        <div class="content">
          {{ item.summery
          }}<span class="btn_detail" @click="toDetail(item)"> 查看详情></span>
        </div>
        <!-- <div class="btn_detail">查看详情></div> -->
      </div>
    </div>
    <!-- 分页 -->
    <div class="Footer">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      List: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
    };
  },
  props: {
    id: {
      default: "",
      type: String,
    },
    keyWord:{
       default: "",
      type: String,
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getList();
    },
    async getList() {
      let data = await this.api.getListAll({
        cids: this.id,
        current: this.pageNo,
        size: this.pageSize,
        cont:this.keyWord
      });

      this.List = data.records;
      this.total = data.total;
    },
    toDetail(item) {
      this.$emit("getDetail", item);
    },
  },
  mounted() {
    this.pageNo = 1;
    this.getList();
  },
  watch: {
    id() {
      this.pageNo = 1;
      this.getList();
    },
    keyWord(){
       this.pageNo = 1;
      this.getList();
    }
  },
};
</script>

<style lang="less" scoped>
.list {
  box-sizing: border-box;
  padding: 20px;
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    .left {
      width: 120px;
      height: 93px;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .right {
      flex: 1;
      .title {
        font-size: 18px;
        font-weight: 400;
        color: #303030;
        margin-bottom: 5px;
      }
      .content {
        font-size: 14px;
        font-weight: 400;
        color: #909090;
        width: 100%;
        box-sizing: border-box;
      }
      .btn_detail {
        font-size: 14px;
        font-weight: 400;
        color: #0c76b3;
        // margin-top: 9px;
        cursor: pointer;
      }
      .btn_detail:hover {
        color: red;
      }
    }
  }
  .Footer {
    display: flex;
    justify-content: center;
    margin: 44px 0 20px;
  }
}
</style>