<template>
  <div id="webMap">
      <div class="main" :style="{width:width+'px'}">
          <h4>网站地图</h4>
            <div class="nav" v-for="(item,index) in navList" :key="index" v-if="item.id!='4688713356973056'">
              <b  @click="toList(item.nm,item.id)"><span>【{{item.nm}}】</span></b>
                <ul>
                   <li v-for="(v,i) in item.list" :key="i"  @click="toList(item.nm,item.id,v.id)">
                     <p>[{{v.nm}}]</p>
                   </li>
                </ul>
            </div>
          <div class="nav">
              <b @click="toList('普法专题','4688713356973056')">【普法专题】</b>
              <ul>
                  <!--<li @click="toList(item.nm,item.id,v.id)">[{{v.nm}}]</li>-->
              </ul>
          </div>
      </div>
  </div>
</template>
<script>
    export default {
       props:['bWidth','width'],
        data() {
            return {
                navList:[],
            };
        },
        mounted() {

            this.getNav()
        },

        components: {
        },
        watch: {

        },
        methods: {
            async getNav() {
                let qry = this.query.new();
                this.query.toW(qry, "pid", 0, "EQ");
                this.query.toW(qry,'showPos','3','LK')
                this.query.toO(qry, "sort", "asc");
                let data = await this.api.getMenuNav(
                    encodeURIComponent(this.query.toJsonStr(qry))
                );
                this.navList.push(...data);
                this.navList.forEach((item,index)=>{
                    let qry2 = this.query.new();
                    this.query.toW(qry2, "pid", item.id, "EQ");
                    this.query.toW(qry2,'showPos','3','LK')
                    this.query.toO(qry2, "sort", "asc");
                    this.api.getMenuNav( encodeURIComponent(this.query.toJsonStr(qry2))).then(res=>{
                        item.list  = res
                        this.$set(this.navList,index,item)
                    })
                })
            },
            toList(nm, id,sId) {
                let param = {
                    nm: nm, //上级栏目名字
                    id: id, //上级栏目id
                    // sId: sId //当前栏目id
                };
                if(sId){
                    param.sId = sId
                }
                this.$router.push({ path: "/newList", query: param });
            },
        }
    };
</script>
<style lang="less" scoped>
  @base: 18rem;
  @import url("../assets/css/init.less");
    #webMap{
        .main{
            margin: 0 auto;
            padding: 20px 0;
            h4{
                text-align: center;
                padding: 40px 0;
                font-size: 25px;
                border-bottom: 2px solid #cccccc;
                margin-bottom: 20px;
            }
            .nav{
                width: 100%;
                display: flex;
                display: -webkit-flex;
                padding: 15px 0;
                b{
                    width: 20%;
                    text-align: center;
                    span{
                      cursor: pointer;
                    }
                    span:hover{
                      text-decoration: underline;
                    }
                }
                ul{
                    flex: 1;
                    li{
                        display: inline-block;
                        width: 20%;
                       p{
                         display: inline-block;
                         cursor: pointer;
                       }
                      p:hover{
                        text-decoration: underline;
                      }
                    }
                }

            }
            /*display: flex;*/
            /*display: -webkit-flex;*/
            /*.nav{*/
                /*flex: 1;*/
                /*text-align: center;*/
            /*}*/
        }
    }
</style>
