<template>
  <div class="myMap" :style="{width:width+'px'}">
    <div id="map" :style="{width:width*0.5+'px'}">

    </div>
    <div class="mapList">
        <p class="title">{{currentInfo.nm}}</p>
      <ul>
        <li v-for="item in list" ><p @click="toDetail(item.id)" :href="'/zjfzol/newList?detailId='+item.id"  :title="item.nm">{{item.nm.length>30 ? item.nm.slice(0,30)+'...':item.nm}}</p></li>
      </ul>
    </div>
  </div>

</template>

<script>
  import map from './map.json'
  export default {
    props:['width'],
    data() {
      return {
          currentInfo:{name:'',id:''},
          currentIndex:-1,
          heigth:100,
        myChart:null,
        resizeTimer:null,
        mapName : 'map',
          list:[],
        dataList : [
          {name:"宁波市",id:1},
          {name:"杭州市",id:2},
          {name:"温州市",id:3},
          {name:"嘉兴市",id:4},
          {name:"湖州市",id:5},
            {name:"绍兴市",id:6},
            {name:"金华市",id:7},
            {name:"衢州市",id:8},
            {name:"舟山市",id:9},
            {name:"台州市",id:10},
            {name:"丽水市",id:11},
        ],
        geoCoordMap : {},
          menuList:[],
      };
    },

    mounted() {
        this.getData()
      let _this = this

      window.addEventListener('resize', function () {
        if (_this.resizeTimer) clearTimeout(_this.resizeTimer);
        _this.resizeTimer = setTimeout(function () {
          _this.myChart.resize();
        }, 100)
      })
    },
    methods: {
        toDetail(id){
            this.$router.push({
                path: "/newList",
                query: {
                    detailId: id,
                    time:new Date().getTime()
                }
            });
        },
      async getData(){
          let id = '4688704618075136'
          let qry = this.query.new();
          this.query.toW(qry, "pid", id, "EQ");
          this.query.toO(qry, "sort", "asc");

          this.menuList = await this.api.getMenuNav(
              encodeURIComponent(this.query.toJsonStr(qry))
          );
          this.dataList = this.menuList
          this.currentInfo = this.menuList[0]
          this.changeMapData(this.menuList[0].id)
        this.$nextTick(()=>{
          // if (process.client){
            this.init()
          // }
        })
      },
      async changeMapData(id){
          let param = {
              catId:id,
              siteId:1,
              pageNo:1,
              pageSize:10
          }
          let data = await this.api.getAllList(param);
          data.data.list.forEach(item => {
              item.releTm = item.releTm ? item.releTm.split(" ")[0] : "";
          });
          this.list = data.data.list;
      },

      init(){
          // 引入 ECharts 主模块
          var echarts = require('echarts/lib/echarts');
        // 引入地图
          require('echarts/lib/chart/map');

        require('echarts/lib/component/geo');

        require("echarts/lib/chart/scatter");
        require("echarts/lib/chart/effectScatter");

        // console.log('地图3')
        // console.log(document.getElementById('map'))
          this.myChart = echarts.init(document.getElementById('map'))

        // console.log('地图4')
          /*获取地图数据*/
          this.myChart.showLoading();
          echarts.registerMap('map',map)
          var mapFeatures = echarts.getMap(this.mapName).geoJson.features;
          // console.log('mapFeatures:'+mapFeatures.length)
          this.myChart.hideLoading();
          mapFeatures.forEach(v =>{
              // 地区名称
              var name = v.properties.name;
              // 地区经纬度
              this.geoCoordMap[name] = v.properties.centroid;

          });
          var convertData = (data) => {
              var res = [];
              for (var i = 0; i < data.length; i++) {
                  var geoCoord = this.geoCoordMap[data[i].nm];
                  // console.log('-----------')
                  // console.log(this.geoCoordMap)
                  // console.log(data[i])
                  if (geoCoord) {

                      res.push({
                          name: data[i].nm,
                          value: geoCoord.concat(data[i].value),
                      });
                  }
              }
              // console.log(res)
              return res;
          };
          let option = {

              tooltip: {
                  padding: 0,
                  enterable: true,
                  transitionDuration: 1,
                  textStyle: {
                      color: '#000',
                      decoration: 'none',
                  },
                  position: function (point, params, dom, rect, size) {

                      return [point[0], point[1]];
                  },
                  formatter: params=> {



                  }

              },

              visualMap: {
                  show: false,
                  min: 0,
                  max: 200,
                  left: '0',
                  top: 'bottom',
                  calculable: true,
                  seriesIndex: [1],
                  inRange: {
                      color: ['#04387b', '#467bc0'] // 蓝绿
                  }
              },
              geo: {
                  show: true,
                  map: this.mapName,
                  label: {
                      normal: {
                          show: false
                      },
                      emphasis: {
                          show: false,
                      }
                  },
                  roam: false,
                  itemStyle: {
                      normal: {
                          areaColor: '#0b468d',
                          borderColor: '#1180c7',
                      },
                      emphasis: {
                          areaColor: '#4499d0',
                      }
                  },
                  zoom: 1.2,   //放大地图
                  top:'10%'
              },
              series: [{
                  name: '散点',
                  type: 'scatter',
                  coordinateSystem: 'geo',
                  data: convertData(this.dataList),
                  symbolSize: function(val) {
                      return val[2] / 10;
                  },
                  label: {
                      normal: {
                          formatter: function (params) {
                              // console.log(params)
                              return params.name;    //地图上展示文字
                          },
                          position: 'right',
                          show: true,
                          color:'#fff',
                          textBorderColor:'#0b468d',
                          textBorderWidth:3
                      },

                  },
                  //文字
                  itemStyle: {
                      normal: {
                          color: '#fff',

                          shadowColor:'#000'
                      }
                  }
              },
                  {
                      type: 'map',
                      map: this.mapName,
                      geoIndex: 0,
                      aspectScale: 0.75, //长宽比
                      showLegendSymbol: false, // 存在legend时显示
                      label: {
                          normal: {
                              show: true
                          },
                          emphasis: {
                              show: false,
                              textStyle: {
                                  color: '#000'
                              }
                          }
                      },
                      roam: true,
                      itemStyle: {
                          normal: {
                              areaColor: '#031525',
                              borderColor: '#3B5077',
                          },
                          emphasis: {
                              areaColor: '#2B91B7'
                          }
                      },
                      animation: false,
                      data: this.dataList
                  },
                  {
                      name: '点',
                      type: 'scatter',
                      coordinateSystem: 'geo',
                      zlevel: 6,
                  },
                  {
                      name: 'Top 5',
                      type: 'effectScatter',
                      coordinateSystem: 'geo',
                      data: convertData(this.dataList.sort(function(a, b) {
                          return b.value - a.value;
                      }).slice(0, 100)),
                      symbolSize: function(val) {
                          return val[2] / 10;
                      },
                      showEffectOn: 'render',
                      rippleEffect: {
                          brushType: 'stroke'
                      },
                      hoverAnimation: true,
                      label: {
                          normal: {
                              formatter: '{b}',
                              position: 'left',
                              show: false
                          }
                      },
                      itemStyle: {
                          normal: {
                              color: 'yellow',
                              shadowBlur: 10,
                              shadowColor: 'yellow'
                          }
                      },
                      zlevel: 1
                  },

              ]
          };
          this.myChart.setOption(option);
          this.myChart.on('click', params=> {
              console.log(params)
              let index = this.menuList.findIndex(item=>{
                  return item.nm === params.name
              })
              if(index>-1 && index!=this.currentIndex){
                  this.currentIndex = index
                  this.changeMapData(this.menuList[index].id)
                  this.currentInfo = this.menuList[index]

              }
           });
      }
    },
    components: {}
  };
</script>
<style lang="less">
  #map{
    canvas{
      /*width: 500px !important;*/
    }
  }
</style>
<style scoped lang="less">
  @import url("../assets/css/init.less");
  .myMap{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    #map{
      margin-left: 1%;
      height: 400px;
    }
    .mapList{
      flex: 1;
      .title{
        font-weight: 700;
        line-height: 40px;
        font-size: 16px;
      }
      ul{
        li{
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          &::before{
            content: '';
            width: 3px;
            height: 3px;
            background: #333333;
            display: block;
            margin-right: 10px;
          }

          p{
            cursor: pointer;
            &:hover{
              color: @themeColor;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

</style>
