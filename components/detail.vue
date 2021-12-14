<template>
  <!-- 详情页 -->
  <div class="container">
    <div
      style="
        width: 100%;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: #303030;
      "
    >
      {{ detailData.title }}
    </div>
    <div style="margin-top: 30px; display: flex; justify-content: center">
      <span style="margin-right: 30px; color: #909090">{{
        detailData.releTm
      }}</span>
      <span v-if="detailData.readQty > 0" style="color: #909090"
        >浏览量:{{ detailData.readQty }}</span
      >
    </div>
    <div v-html="detailData.cont"></div>
    <div class="updownpage">
      <p @click="toUpPage">上一篇:{{ detailData.beforeTitle }}</p>
      <p @click="toDownPage">下一篇:{{ detailData.nextTitle }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailData: "",
      timer: null,
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
      if (this.detailData.beforeTitle) {
        this.$router.push({
          path: "/newList",
          query: {
            detailId: this.detailData.beforeId,
            showType: 1,
            // nm: this.nm,
            time: new Date().getTime(),
          },
        });
      }
    },
    toDownPage() {
      if (this.detailData.nextTitle) {
        this.$router.push({
          path: "/newList",
          query: {
            detailId: this.detailData.nextId,
            showType: 1,
            // nm: this.nm,
            time: new Date().getTime(),
          },
        });
      }
    },
  },
  async mounted() {
    // 详情
    if (this.detailId) {
      clearTimeout(this.timer);
      this.detailData = await this.api.getDetail(this.detailId);
      this.detailData.cont = this.detailData.cont.replace(
        /<img[^>]*>/gi,
        function (match, capture) {
          return match.replace(/(<img[^>]*)(\/?>)/gi, "$1width='100%' $2"); // 添加width="100%"
        }
      );
      this.detailData.cont = this.detailData.cont.replace(
        /<img[^>]*>/gi,
        function (match, capture) {
          return match.replace(
            /style\s*?=\s*?([‘"])[\s\S]*?\1/gi,
            'style="max-width:100%;height:auto;"'
          ); // 替换style
        }
      );
      //   5s后自动调用浏览量
      this.timer = setTimeout(async () => {
        await this.api.readAdd(this.detailId);
      }, 5000);
    }
  },
  watch: {
    async detailId() {
      if (this.detailId) {
        clearTimeout(this.timer);
        this.detailData = await this.api.getDetail(this.detailId);
        this.detailData.cont = this.detailData.cont.replace(
          /<img[^>]*>/gi,
          function (match, capture) {
            return match.replace(/(<img[^>]*)(\/?>)/gi, "$1width='100%' $2"); // 添加width="100%"
          }
        );
        this.detailData.cont = this.detailData.cont.replace(
          /<img[^>]*>/gi,
          function (match, capture) {
            return match.replace(
              /style\s*?=\s*?([‘"])[\s\S]*?\1/gi,
              'style="max-width:100%;height:auto;"'
            ); // 替换style
          }
        );

        // 5s后自动调用浏览量
        this.timer = setTimeout(async () => {
          await this.api.readAdd(this.detailId);
        }, 5000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
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
</style>