<template>
  <ul class="example-list">
    <li class="example-item" v-for="(item, index) in list" :key="index">
      <span></span>
      <p @click="toDetail(item)" :title="item.nm" :href="'/zjfzol/newList?detailId='+item.id">{{item.nm.length>23 ? item.nm.slice(0,23)+'...':item.nm}}</p>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  import menuList from '~/components/menuList.vue'
  import rightNew from '@/components/rightNew.vue'
export default {
  props: ["list", "showContent"],
  data() {
    return {};
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
@import url("../assets/css/init.less");
.example-list {
  margin: 20px 0 0;
  padding-left: 20px;
  color: #333;
  .example-item {
    height: 30px;
    line-height: 30px;


    display: flex;
    display: -webkit-flex;
    align-items: center;
    span {
      display: block;
      width: 3px;
      height: 3px;
      background: #333;
      margin-right: 5px;
    }
    p {
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
        color: @themeColor;
      }
    }
  }
}
</style>
