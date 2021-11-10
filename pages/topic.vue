<template>
  <div id="topics">
      <iframe :src="url" width="100%" height="100%" frameBorder=0 marginWidth=0 marginHeight=0></iframe>
      <!--<div v-html="html"></div>-->
  </div>
</template>
<script>
    export default {
       props:['bWidth','width'],
        data() {
            return {
                id:0,
                type:0,
                info:{},
                file:'topicComp',
                comp:null,
                html: '',
                url:'',
            };
        },
        mounted() {
            this.id = this.$route.query.id
            if(this.id){
                this.getUrl()
                // this.getHtml()
            }
            if(this.$route.query.temp){
                this.comp = resolve => require.ensure([], () => resolve(require("./"+this.file+"/"+this.$route.query.temp+"/app.vue")));
            }

        },

        components: {
        },
        watch: {

        },
        methods: {
            async getInfo(){
                let param = {
                    columnId:this.id
                }
                this.info = await this.api.themeInfo(param)
                let url = this.info.columnTemp.url.split('=')[1]
                console.log(url)
                this.comp = resolve => require.ensure([], () => resolve(require("./"+this.file+"/"+url+"/app.vue")));

            },
            getUrl(){
                // let param = {
                //     id:this.id
                // }
                // this.url = window.location.origin+'/theme/column/api/template/show2?id=' + this.id
              this.url = this.hostUrl+'/theme/column/api/template/show2?id=' + this.id
                console.log(this.url)
                // this.api.themeUrl(param).then(res => {
                //     this.url = res
                // });
            },
          getHtml(){
            let param = {
              id:this.id
            }
            this.api.themeContent(param).then(res => {
              this.html = res
            });
          },
            toPage(info){
                if(info.id){
                    this.$router.push({
                        path: "/newList",
                        query: {
                            detailId: info.id,
                            time:new Date().getTime()
                        }
                    });
                }

            }
        }
    };
</script>
<style lang="less" scoped>
  @base: 18rem;
  @import url("../assets/css/init.less");
  #topics{
      width: 100%;
      height: 100%;

  }
</style>
