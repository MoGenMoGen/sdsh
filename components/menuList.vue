<template>
  <div id="left" :style="{width:width+'px'}">
    <ul>
      <li
        v-for="item in menuList"
        v-if="item.id!='4831351428027392'"
        @click="toMenu(item)"
      >{{item.nm}}</li>
    </ul>
  </div>
</template>
<script>
    export default {
        props:["menuList",'width'],
        data() {
            return {
                title: "法治文化",
                detailId:'',
                list:[],
                topList:[],
                pageNo:1,
                pageSize:9,
                total:0,
            };
        },
      created(){
        this.pageNo = this.until.getQueryString('pageNo') ?  parseInt(this.until.getQueryString('pageNo')) : 1

      },
        mounted() {

            this.getList()
        },
        components: {},
        watch: {


        },
        computed:{
            widthLi(){
                return this.width*0.31
            }
        },
        methods:{
            async getList(){
                this.list = await this.api.getDouYinCount();

            },

            toDetail(item){

                this.$emit('setDYopenId',item)
            },
            close(){
                this.detailId = ''
            },
            handleCurrentChange(e){
              this.pageNo = e;

              let url = this.until.changeQueryString('pageNo',e)
              console.log(url)
              window.location.href = url;
            },
        }
    };
</script>
<style lang="less" scoped>
  @base: 18rem;
  @import url("../assets/css/init.less");
  .left {
    width: 12%;
    margin-right: 1%;
    margin-left: 1%;
    padding-top: 20px;
    position: relative;
    ul li {
      background: #2d8ce1;
      text-align: center;
      color: #ffffff;
      padding: 12px 5px;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }

</style>
