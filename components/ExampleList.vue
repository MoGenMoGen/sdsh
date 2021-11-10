<template>
  <div class="example-list">
    <div class="example-item" v-for="(item, index) in list" :key="index" @click="toDetail(item)" :href="'/zjfzol/newList?detailId='+item.id" >
      <div class="set-height-img">
        <img :src="item.imgUrl" :style="{width:width+'px',height:height+'px'}" alt />
      </div>
      <p v-if="showContent"  :title="item.nm">{{item.nm}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["list", "showContent", "width", "height"],
  data() {
    return {};
  },
  mounted() {
    // console.log('width:===========')
    // console.log(this.width)
  },
  components: {},
  methods: {
    toDetail(info) {
      this.$emit("toDetail", info);
    }
  }
};
</script>

<style scoped lang="less">
.example-list {
  display: flex;
  display: -webkit-flex;
  flex-flow: row wrap;
  justify-content: space-between;
  .example-item {
    width: 48%;
    position: relative;
    margin-top: 25px;
    cursor: pointer;
    .set-height-img {
      width: 100%;
      display: flex;
      display: -webkit-flex;
      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        margin: auto;
      }
    }

    p {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 98%;
      padding-left: 2%;
      height: 40px;
      line-height: 40px;
      background-color: rgba(0, 0, 0, 0.7);
      color: #fff;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
}
</style>
