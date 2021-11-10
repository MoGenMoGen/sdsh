<template>
  <div class="raw-list" >
    <div class="raw-item" v-if="list.length>0">
      <div v-for="(item, index) in list.slice(0,1)" :key="index" >
        <div class="img" :style="{width:width+'px',height:height+'px'}">
          <img  v-if="item.imgUrl" :style="{width:width+'px',height:height+'px'}" :src="item.imgUrl"  alt />
        </div>
        <div class="listContent">
          <p @click="toDetail(item)" :href="'/zjfzol/newList?detailId='+item.id" >{{item.title}}</p>
          <p>
            {{item.summary.slice(0,25)}}...
            <a @click="toDetail(item)" :href="'/zjfzol/newList?detailId='+item.id" >[全文]</a>
          </p>
        </div>
      </div>
      <ul>
        <li v-for="(item, j) in list.slice(1,3)" :key="j">
          <span></span>
          <p  @click="toDetail(item)" :href="'/zjfzol/newList?detailId='+item.id"  :title="item.title">{{item.nm && item.nm.length>23 ? item.title.slice(0,23)+'...':item.title}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["list", "width", "height"],
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {
    toDetail(info) {
      this.$emit("toDetail", info);
    }
  }
};
</script>

<style scoped lang="less">
@import url("../assets/css/init.less");
.raw-list {
  padding-top: 20px;
  .raw-item {
    > div,
    ul {
      flex: 1;
    }
    > div {
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
      .img {
        /*display: flex;*/
        /*display: -webkit-flex;*/

        img {
          width: 100%;
          height: 100%;
        }
      }

      .listContent {
        flex: 1;
        margin-left: 25px;
        p {
          &:nth-of-type(1) {
            color: #0064b2;
            display: inline;
            cursor: pointer;
            &:hover{
              text-decoration: underline;
            }
          }
          &:nth-of-type(2) {
            padding-top: 20px;
            a {
              color: #f00;
              cursor: pointer;
            }
          }
        }
      }
    }
    ul {
      margin: 10px 0 0 0;
      color: #333;
      li {
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        span {
          display: block;
          width: 3px;
          height: 3px;
          background: #333;
          margin-right: 5px;
          flex-shrink: 0;
        }
        p {
          cursor: pointer;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        p:hover {
          text-decoration: underline;
          color: @themeColor;
        }
      }

    }
  }
}
</style>
