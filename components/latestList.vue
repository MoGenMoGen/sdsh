<template>
  <!-- 右侧最新列表 -->
  <div class="main">
    <div class="sh_intro">
      <div
        class="intro_box"
        v-for="(item1, index1) in leaderList"
        :key="index1"
        @click="handleLeader(item1.title)"
      >
        {{ item1.title }}
      </div>
    </div>
    <div class="list">
      <div class="title">
        <div class="text">最新栏目</div>
      </div>
      <div class="content_list">
        <div
          class="item"
          v-for="(item1, index1) in list1"
          :key="index1"
          @click="toDetail(item1)"
        >
          {{ item1.title }}
        </div>
      </div>
    </div>
    <div class="sh_intro">
      <div
        class="intro_box"
        v-for="(item2, index2) in introList"
        :key="index2"
        @click="handleIntro(item2.id)"
      >
        {{ item2.title }}
      </div>
    </div>
    <div class="list">
      <div class="title">
        <div class="text">最新通知</div>
      </div>
      <div class="content_list">
        <div
          class="item"
          v-for="(item2, index2) in list2"
          :key="index2"
          @click="toDetail(item2)"
        >
          {{ item2.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list1: [],
      list2: [],
      introList: [],
      leaderList: [],
    };
  },
  props: {
    nm: {
      default: "",
      type: String,
    },
  },
  methods: {
    //获取领导班子和商会介绍子列表
    async getSonList() {
      console.log("nm", this.nm);
      //领导班子
      if (this.nm == "领导班子") {
        this.leaderList = await this.api.getMenuNav({
          parentId: "1458383124973244417",
        });
        this.introList = [];
      }
      //商会介绍
      else if (this.nm == "商会介绍") {
        this.introList = await this.api.getMenuNav({
          parentId: "1458345268556877826",
        });
        this.leaderList = [];
        // console.log('商会介绍',this.introList);
      } else {
        this.introList = [];
        this.leaderList = [];
      }
      // console.log('introList',this.introList);
      // console.log('leaderList',this.leaderList);
    },
    handleIntro(id) {
      console.log("商会item", id);
      this.$emit("getIntroItem", id);
    },
    handleLeader(nm) {
      console.log('右侧栏目',nm);
      this.$emit("handleLeader", nm);
    },
    //获取最新栏目和最新通知
    async getList() {
      //最新栏目
      let data1 = await this.api.getLatestMenu({
        current: 1,
        size: 6,
      });
      this.list1 = data1.records;
      //最新通知
      let data2 = await this.api.getListAll({
        cids: "1458444436709330945",
        current: 1,
        size: 6,
      });
      this.list2 = data2.records;
    },
    toDetail(item) {
      this.$emit("getDetail", item);
    },
  },
  async mounted() {
    // console.log('右侧mounted');
    this.getSonList();
    this.getList();
  },
  watch: {
    nm(newV, oldV) {
      this.getSonList();
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  padding: 20px;
  box-sizing: border-box;
  .sh_intro {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .intro_box {
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      background: #0c76b3;
      width: 40%;
      padding: 10px 0;
      text-align: center;
      margin-bottom: 20px;
      cursor: pointer;
    }
    .intro_box:hover {
      color: red;
    }
  }
  .list {
    .title {
      border-bottom: 1px solid #e8e8e8;
      .text {
        border-bottom: 2px solid #0c76b3;
        width: 75px;
        height: 18px;
        font-size: 18px;
        font-weight: 400;
        color: #333333;
        line-height: 18px;
        padding: 2px 0;
      }
    }
    .content_list {
      padding: 20px 0;
      width: 100%;
      box-sizing: border-box;
      .item {
        width: 100%;
        height: 16px;
        font-size: 16px;
        font-weight: 400;
        color: #666666;
        line-height: 16px;
        margin-bottom: 19px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
      .item:hover {
        color: rgb(12, 118, 179);
      }
    }
  }
}
</style>