<template>
  <div class="list">
    <div class="title_box">
      <div class="title">{{ title }}</div>
      <span class="btn_more" @click="toPage">更多></span>
    </div>
    <div class="content_box">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="toDetail(item)"
      >
        <div class="new_title">{{ item.title }}</div>
        <div class="time">{{ item.releTm }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  props: {
    type: {
      default: "",
      type: String,
    },
  },
  computed: {
    title() {
      if (this.type == 3) return "商会新闻";
      else if (this.type == 4) return "通知公告";
      else if (this.type == 5) return "商会活动";
      else if (this.type == 6) return "党建新闻";
      else if (this.type == 8) return "会员风采";
      else if (this.type == 2) return "领导班子";
      else return "标题";
    },
    id() {
      if (this.type == 3) return "1458395797022593026";
      else if (this.type == 4) return "1458444436709330945";
      else if (this.type == 5) return "1458444436738691073";
      else if (this.type == 6) return "1458493470699253762";
      else if (this.type == 8) return "1458457055033888769";
      else if (this.type == 2) return "1458383124973244417";
      else return "";
    },
    showType() {
      if (this.type == 3) return 2;
      else if (this.type == 4) return 1;
      else if (this.type == 5) return 2;
      else if (this.type == 6) return 2;
      else if (this.type == 8) return 2;
      else if (this.type == 2) return 3;
      else return 3;
    },
  },
  methods: {
    toPage() {
      this.$router.push({
        path: "/newList",
        query: {
          id: this.id,
          nm: this.title,
          showType: this.showType,
        },
      });
    },
    toDetail(info) {
      this.$router.push({
        path: "/newList",
        query: {
          detailId: info.id,
          time: new Date().getTime(),
          nm: this.title,
          showType: this.showType,
        },
      });
    },
  },
  async mounted() {
    let data = await this.api.getListAll({
      cids: this.id,
      current: 1,
      size: 6,
    });
    this.list = data.records;
  },
};
</script>

<style lang="less" scoped>
.list {
  width: calc(~"50% - 10px");
  background: #fff;
  padding: 20px;
  padding-top: 5px;
  box-sizing: border-box;
  margin-bottom: 20px;
  .title_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e8e8e8;
    padding: 10px 0;
    .title {
      position: relative;
      font-size: 18px;
      color: #333333;
      font-weight: bold;
    }
    .title::after {
      content: "";
      width: 70px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -10px;
      height: 2px;
      background: #0c76b3;
    }
    .btn_more {
      cursor: pointer;
    }
    .btn_more:hover {
      color: red;
    }
  }
  .content_box {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 15px 0;
      .new_title {
        min-height: 0px;
        font-size: 16px;
        font-weight: 400;
        color: #666666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: calc(~"100% - 180px");
        cursor: pointer;
      }
      .new_title:hover {
        color: rgb(12, 118, 179);
      }
      .time {
        width: 150px;
        font-size: 14px;
        font-weight: 400;
        color: #999999;
      }
    }
  }
}
</style>