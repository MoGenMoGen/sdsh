<template>
  <div class="container">
    <!-- 领导班子详情 -->
    <img :src="info.imgUrl" alt="" />
    <div v-html="info.cont" style="margin-top: 30px; margin-bottom: 73px"></div>
    <div class="updownpage">
      <p @click="toUpPage">上一篇:{{ info.beforeTitle }}</p>
      <p @click="toDownPage">下一篇:{{ info.nextTitle }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
    };
  },
  props: {
    detailId: {
      default: "",
      type: String,
    },
  },
  methods: {
    toUpPage() {
      if (this.info.beforeTitle) {
        this.$router.push({
          path: "/newList",
          query: {
            detailId: this.info.beforeId,
            showType: 3,
            nm: "领导班子",
            time: new Date().getTime(),
          },
        });
      }
    },
    toDownPage() {
      if (this.info.nextTitle) {
        this.$router.push({
          path: "/newList",
          query: {
            detailId: this.info.nextId,
            showType: 3,
            nm: "领导班子",
            time: new Date().getTime(),
          },
        });
      }
    },
  },
  async mounted() {
    // 详情
    if (this.detailId) {
      this.info = await this.api.getDetail(this.detailId);
      this.info.cont = this.info.cont.replace(
        /<img[^>]*>/gi,
        function (match, capture) {
          return match.replace(
            /(<img[^>]*)(\/?>)/gi,
            "$1style='max-width:100%;height:auto;' $2"
          );
        }
      );
    }
  },
  watch: {
    async detailId() {
      if (this.detailId) {
        this.info = await this.api.getDetail(this.detailId);
        this.info.cont = this.info.cont.replace(
          /<img[^>]*>/gi,
          function (match, capture) {
            return match.replace(
              /(<img[^>]*)(\/?>)/gi,
              "$1style='max-width:100%;height:auto;' $2"
            );
          }
        );
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  img {
    width: 658px;
    height: 739px;
    object-fit: cover;
  }
  .name {
    font-size: 16px;
    font-weight: 400;
    color: #000000;
    margin-top: 19px;
    margin-bottom: 73px;
    text-align: center;
  }
  .updownpage {
    width: 100%;
    box-sizing: border-box;
    padding: 23px 30px;
    background: #e7e7e7;
    p {
      font-size: 16px;
      font-weight: 400;
      color: #606060;
      cursor: pointer;
    }
    p:hover {
      color: red;
    }
  }
}
</style>