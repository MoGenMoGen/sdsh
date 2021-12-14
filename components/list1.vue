<template>
  <!--只含文字的列表  -->
  <div class="list">
    <div class="item" v-for="(item, index) in List" :key="index">
      <div class="title" @click="toDetail(item)">{{ item.title }}</div>
      <div class="content">
        {{ item.summery
        }}
        <!-- <span class="btn_detail" @click="toDetail(item)"> 查看详情></span> -->
      </div>
      <div class="btn_detail"  @click="toDetail(item)">查看详情></div>
    </div>
    <!-- 分页 -->
    <div class="Footer">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
        :current-page="pageNo"
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
      console.log(111,this.pageNo);
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  box-sizing: border-box;
  padding: 30px;
  .item {
    margin-bottom: 40px;
    .title {
      font-size: 18px;
      font-weight: 400;
      color: #303030;
      margin-bottom: 5px;
      cursor: pointer;
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
      margin-top: 10px;
      cursor: pointer;
    }
    .btn_detail:hover {
      color: red;
    }
  }
  .Footer {
    display: flex;
    justify-content: center;
    margin: 44px 0 20px;
  }
}
</style>