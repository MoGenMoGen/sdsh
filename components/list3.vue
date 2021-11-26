<template>
  <!--领导班子 图片列表展示  -->
  <div>
    <div class="list">
      <div
        class="item"
        v-for="(item, index) in List"
        :key="index"
        @click="toDetail(item)"
      >
        <img :src="item.imgUrl" alt="" />
        <div class="name">{{ item.title }}</div>
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
      pageSize: 12,
      total: 0,
    };
  },
  props: {
    leaderId: {
      default: "",
      type: String,
    },
  },
  watch: {
    leaderId() {
      this.pageNo = 1;
      this.getList();
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getList();
    },
    async getList() {
      let data = await this.api.getLeaderList({
        cid: this.leaderId,
        current: this.pageNo,
        size: this.pageSize,
      });
      this.List = data.records;
      this.total = data.total;
    },
    toDetail(item) {
      console.log("去领导详情");
      this.$emit("getDetail", item);
    },
  },
  mounted() {
    console.log("mountedsssssss");
    this.$parent.leaderId = "";
    console.log(11111, this.leaderId);
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.list {
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  .item {
    margin-right: 20px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      object-fit: cover;
      width: 200px;
      height: 230px;
      cursor: pointer;
    }
    .name {
      font-size: 18px;
      font-weight: 400;
      color: #333333;
      margin: 20px 0;
      cursor: pointer;
    }
    .name:hover {
      color: rgb(12, 118, 179);
    }
  }
  .item:nth-child(4n) {
    margin-right: 0px;
  }
}
.Footer {
  display: flex;
  justify-content: center;
  margin: 44px 0 20px;
}
</style>