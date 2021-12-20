<template>
  <ul :style="{ width: width + 'px' }">
    <li
      @click="toPage(item, index)"
      v-for="(item, index) in navList"
      :key="index"
      :class="{ active: currentTab == index }"
      style="text-align: center"
    >
      {{ item.title }}
      <!-- <img :src="line" v-if="index < navList.length - 1" /> -->
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0,
      width: 0,
      bWidth: 0,
      navList: [
        {
          title: "首页",
          cd: "home",
          url: "/",
          showType: 0,
        },
      ],
    };
  },
  props: {
    id: {
      default: "",
      type: String,
    },
  },
  methods: {
    async getNav() {
      this.navList = [
        {
          title: "首页",
          cd: "home",
          url: "/",
          showType: 0,
        },
      ];
      let data = await this.api.getMenuNav({ parentId: 0 });
      console.log("navlist", data);
      data.forEach((item) => {
        if (item.showPos.indexOf("1") > -1) {
          this.navList.push(item);
        }
      });
      if (this.id) {
        this.currentTab = this.navList.findIndex((item) => item.id == this.id);
      }
    },
    toPage(item, index) {
      if (item.url) {
        this.$router.push("/");
        this.currentTab = 0;
      } else {
        this.currentTab = index;
        this.currentNav = item.nm;
        this.$router.push({
          path: "/newList",
          query: {
            id: item.id,
            nm: item.title,
            showType: item.showType,
          },
        });
      }
    },
   getWidth() {
      let width = document.body.clientWidth-17;
      if (width < 1000) {
        this.width = 1000-17;
        this.bWidth = 1000;
      }
      if (width >= 1000 && width <= 1200) {
        this.width = 1000;
        this.bWidth = width;
      }
      if (width > 1200) {
        this.width = 1200;
        this.bWidth = width;
      }
    },
  },
  mounted() {
    this.getWidth();
    window.onresize = () => {
      return (() => {
        this.getWidth();
      })();
    };
    this.getNav();
  },
  watch: {
    id() {
      this.getWidth();
      if (this.id) {
        this.currentTab = this.navList.findIndex((item) => item.id == this.id);
      }
    },
  },
};
</script>

<style lang="less" scoped>
ul {
  margin: 0 auto;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  // flex-flow: row nowrap;
  // flex: 1;
  li {
    text-align: center;
    color: #999;
    list-style: none;
    flex: 1;
    cursor: pointer;
    height: 56px;
    line-height: 56px;
    // display: flex;
    // display: -webkit-flex;
    // align-items: center;
    // display: inline-block;
    // p {
    //   text-align: center;
    //   flex: 1;
    // }
  }
  .active {
    color: #0c76b3;
    position: relative;
  }
  .active::after {
    content: "";
    width: 70px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 2px;
    height: 2px;
    background: #0c76b3;
  }
  // li:hover {
  //   text-decoration: underline;
  //   color: @themeColor;
  // }
  // }
}
</style>