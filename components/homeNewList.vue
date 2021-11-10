<template>
  <div class="list">
    <div class="title_box">
      <div class="title">{{ title }}</div>
      <span>更多></span>
    </div>
    <div class="content_box">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="new_title">{{ item.nm }}</div>
        <div class="time">{{ item.time }}</div>
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
      list: [
        {
          nm: "“威龙夜，鲁商情”山东商会dhfftghjtgjkyhgkyhktyg中秋联谊会暨威龙有机荟答谢会成还让他忽然他回家",
          time: "2020-01-01",
        },
        {
          nm: "“威龙夜，鲁商情”山东商会中秋联谊会暨威龙有机荟答谢会成还让他忽然他回家",
          time: "2020-01-01",
        },
        {
          nm: "“威龙夜，鲁商情”山东商会中秋联谊会暨威龙有机荟答谢会成还让他忽然他回家",
          time: "2020-01-01",
        },
        {
          nm: "“威龙夜，鲁商情”山东商会中秋联谊会暨威龙有机荟答谢会成还让他忽然他回家",
          time: "2020-01-01",
        },
        {
          nm: "“威龙夜，鲁商情”山东商会中秋联谊会暨威龙有机荟答谢会成还让他忽然他回家",
          time: "2020-01-01",
        },
        {
          nm: "“威龙夜，鲁商情”山东商会中秋联谊会暨威龙有机荟答谢会成还让他忽然他回家",
          time: "2020-01-01",
        },
      ],
    };
  },
  computed: {
    title() {
      if (this.id == 3) return "商会新闻";
      else if (this.id == 4) return "通知公告";
      else if (this.id == 5) return "商会活动";
      else if (this.id == 6) return "党建新闻";
      else if (this.id == 8) return "会员风采";
      else if (this.id == 2) return "领导班子";
      else return "标题";
    },
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
  margin-bottom:20px;
  .title_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e8e8e8;
    padding:10px 0;
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
  }
  .content_box {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin:15px 0;
      .new_title {
        min-height: 0px;
        font-size: 16px;
        font-weight: 400;
        color: #666666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: calc(~"100% - 109px");
      }
      .time {
        width: 80px;
        font-size: 14px;
        font-weight: 400;
        color: #999999;
      }
    }
  }
}
</style>