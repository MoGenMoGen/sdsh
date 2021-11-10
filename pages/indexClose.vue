<template>
  <!--<div id="home" :style="{width:bWidth+'px'}">-->
  <div id="home">
    <table width="740" border="0" align="center" cellpadding="0" cellspacing="0">
      <tbody>
      <tr><td width="740" height="44">&nbsp;</td></tr>
      <tr></tr>
      <tr>
        <td height="300" align="center" valign="top" >
          <table width="95%" border="0" align="center" cellpadding="3" cellspacing="0"  style="WORD-WRAP: break-word; font-size: 24px;">
            <tbody>
            <tr>
              <td height="20" align="center" ><br><font  size="32" face="黑体"><strong>关于网站关停的公告</strong></font></td>
            </tr>
            <tr><td height="23" align="center" valign="middle" >&nbsp;</td></tr>
            <tr>
              <td height="344" >
                <font face="黑体"><p style="text-indent:2em">根据《浙江省人民政府办公厅关于进一步加强政府网站监管工作的通知》要求，尚在运行的政府部门下属单位网站，“县级以上各级人民政府及其部门原则上一个单位最多开设一个网站”，“浙江法治在线”网站予以关停。</p></font>
                <font face="黑体"><p style="text-indent:2em">为此对您造成的不便敬请谅解。</p></font>
                <font face="黑体"><p style="text-indent:2em">特此公告</p></font>
                <font > <p style="text-indent:2em;text-align:right">浙江省普法办<br>
                  2020年10月8日</p></font>

              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
    <!--<home-advert :width="bWidth"></home-advert>-->
    <!--<div class="advertLeft" :style="{width:0.1*bWidth+'px'}">-->
      <!--<div v-for="(item,index) in advertLeft" :key="index">-->
        <!--<i class="el-icon-close" @click="closeAdvert('left',index)"></i>-->
        <!--<img :src="item.imgUrl" @click="toPage(item.locUrl)"/>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="advertRight" :style="{width:0.1*bWidth+'px'}">-->
      <!--<div v-for="(item,index) in advertRight" :key="index">-->
        <!--<i class="el-icon-close"  @click="closeAdvert('right',index)"></i>-->
        <!--<img :src="item.imgUrl"@click="toPage(item.locUrl)"/>-->
      <!--</div>-->
    <!--</div>-->
    <!--<video-show v-if="videoShow" @close="close" :info="videoInfo" @changeVideo="changeVideo"></video-show>-->
    <!--<div class="main" :style="{width:width+'px'}">-->
      <!--<h1 >-->
        <!--<span class="cursor"  @click="toPage(topNew[0].locUrl)"> {{topNew[0].showContent}}</span>-->
      <!--</h1>-->
      <!--<div class="new-list">-->
        <!--<div class="swiper" :style= "{height:width*0.375*0.78+'px',width:width*0.375+'px'}">-->
          <!--&lt;!&ndash; 轮播图 &ndash;&gt;-->
          <!--<div class="block">-->
            <!--<el-carousel>-->
              <!--<el-carousel-item v-for="item in bannerList" :key="item.id">-->
                <!--<div class="img" @click="toPage(item.locUrl)">-->
                  <!--<p>{{item.nm.slice(0,15)}}...</p>-->
                  <!--<img :src="item.imgUrl" />-->
                <!--</div>-->
              <!--</el-carousel-item>-->
            <!--</el-carousel>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="tab-show"  :style= "{height:width*0.375*0.78+'px'}">-->
          <!--&lt;!&ndash; tab展示 &ndash;&gt;-->
          <!--<div class="tab-header">-->
            <!--<div-->
              <!--v-for="(item, index) in TAB_List"-->
              <!--:class="{active:selectTab===item.id}"-->
              <!--class="cursor"-->
              <!--@click="changeTab(item.id)"-->
              <!--@mouseover="changeTab(item.id)"-->
              <!--:key="index"-->
            <!--&gt;{{item.value}}</div>-->
          <!--</div>-->
          <!--&lt;!&ndash;<h3  v-if="TAB_New_List &&TAB_New_List.length>0">&ndash;&gt;-->
            <!--&lt;!&ndash;<p @click="toDetail(TAB_New_List[0])">{{TAB_New_List[0].nm}}</p>&ndash;&gt;-->
          <!--&lt;!&ndash;</h3>&ndash;&gt;-->
          <!--&lt;!&ndash;<p v-if="TAB_New_List && TAB_New_List.length>0">&ndash;&gt;-->
            <!--&lt;!&ndash;{{TAB_New_List[0].summary}}&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="cursor" @click="toDetail(TAB_New_List[0])">[全文]</span>&ndash;&gt;-->
          <!--&lt;!&ndash;</p>&ndash;&gt;-->
          <!--<ul>-->
            <!--<li-->
              <!--v-for="(item, index) in TAB_New_List"-->
              <!--:key="index"-->
              <!--v-if="index<8"-->
            <!--&gt;<p @click="toDetail(item)" :href="'/zjfzol/newList?detailId='+item.id"   class="cursor" :title="item.nm">{{item.nm.length>23 ? item.nm.slice(0,23)+'...':item.nm}}</p></li>-->
            <!--&lt;!&ndash;<p class="more" @click="toList('法治新闻',{pid:'4536030838313984'})"  v-if="selectTab=='4536030838313984'">更多></p>&ndash;&gt;-->
            <!--&lt;!&ndash;<p class="more" @click="toList('工作动态',{pid:'4688704618075136'})"  v-if="selectTab=='4688704618075136'">更多></p>&ndash;&gt;-->
          <!--</ul>-->
        <!--</div>-->
        <!--<div class="note-show"  :style= "{height:width*0.375*0.78+'px'}">-->
          <!--&lt;!&ndash; 新闻展示 &ndash;&gt;-->
          <!--<div class="title">-->
            <!--<p @click="toList('通知公告',{id:'4691603005625344'})">通知公告</p>-->
            <!--&lt;!&ndash;<span class="more" >更多></span>&ndash;&gt;-->
          <!--</div>-->
          <!--<ul>-->
            <!--<li-->
              <!--v-for="(item, index) in newList"-->
              <!--:key="index"-->
              <!--class="cursor"-->
              <!--v-if="index<8"-->
              <!--@click="toDetail(item)"-->
              <!--:title="item.nm"-->
            <!--&gt;-->
              <!--{{item.nm.length>13 ? item.nm.slice(0,13)+'...':item.nm}}-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

    <!--<div class="banner" :style="{width:width+'px'}" v-if="bannerList4.length>0">-->

      <!--<img :src="item.imgUrl"  v-for="(item,index) in bannerList4" :key="index" @click="toPage(item.locUrl)"/>-->
    <!--</div>-->
    <!--<div class="banner2" :style="{width:width+'px'}" v-if="bannerList2.length>0">-->
      <!--<img :src="item.imgUrl"  v-for="(item,index) in bannerList2" :key="index" @click="toPage(item.locUrl)" v-if="index<2"/>-->
    <!--</div>-->
    <!--<div class="main" :style="{width:width+'px'}">-->
      <!--<div class="example-one">-->
        <!--&lt;!&ndash; 玩转普法 &ndash;&gt;-->
        <!--<div>-->
          <!--<div class="common-law cursor" @click="toList('玩转普法',{pid:'4690117082059776'})"></div>-->
          <!--<div class="example">-->
            <!--<div>-->
              <!--<div class="moreTitle">-->
                <!--<img :src="netImg" alt @click="toList('玩转普法',{pid:'4690117082059776',id:'4691583290561536'})" class="cursor" />-->
                <!--&lt;!&ndash;<span  @click="toList('玩转普法',{pid:'4690117082059776',id:'4691583290561536'})" class="more">更多></span>&ndash;&gt;-->
              <!--</div>-->
              <!--<div class="net-example" @click="toDetail(puFaList1[0])">-->
                <!--<div class="img">-->
                  <!--<img :src="puFaList1[0].imgUrl" :style="{width:funRawW+'px',height:funRawH+'px'}" alt />-->
                <!--</div>-->
                <!--<p class="cursor">{{puFaList1[0].nm}}</p>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div>-->
              <!--<div class="moreTitle">-->
                <!--<img :src="videoImg" alt @click="toList('玩转普法',{pid:'4690117082059776',id:'4691583942480896'})" class="cursor" />-->
                <!--&lt;!&ndash;<span  @click="toList('玩转普法',{pid:'4690117082059776',id:'4691583942480896'})" class="more">更多></span>&ndash;&gt;-->
              <!--</div>-->
              <!--<div  class="video-examples">-->
                <!--<div class="video-example" @click="toDouYin(item.lawDouyinVo)" v-for="(item,index) in puFaList2" :key="index">-->
                  <!--<div class="img" :style="{backgroundImage:'url('+item.lawDouyinVo.cover+')',height:funRawH+'px'}" >-->
                  <!--</div>-->
                  <!--<p class="cursor">{{item.lawDouyinVo.title}}</p>-->
                <!--</div>-->

              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div>-->
          <!--&lt;!&ndash; 轮播图 &ndash;&gt;-->
          <!--<img-->
            <!--:src="item.imgUrl"-->
            <!--@click="toPage(item.locUrl)"-->
            <!--v-for="(item,index) in bannerList3"-->
            <!--class="cursor"-->
          <!--/>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="example-two" :style="{width:width+'px'}">-->
        <!--<div class="title cursor" @click="toList('基层依法治理',{pid:'4690117517235200'})"></div>-->
        <!--<div class="example">-->
          <!--<div>-->
            <!--<div class="moreTitle" >-->
              <!--<img :src="culture"  @click="toList('基层依法治理',{pid:'4690117517235200',id:'4691621767517184'})"  alt class="cursor"/>-->
              <!--&lt;!&ndash;<span>更多></span>&ndash;&gt;-->
            <!--</div>-->

            <!--<example-list-->
              <!--:list="jiCeng1"-->
              <!--:showContent="true"-->
              <!--:width="imgWidth"-->
              <!--:height="imgHeigh"-->
              <!--@toDetail="toDetail"-->
            <!--&gt;</example-list>-->
          <!--</div>-->
          <!--<div>-->
            <!--<div class="moreTitle">-->
              <!--<img :src="panoramic" alt class="cursor"  @click="toList('基层依法治理',{pid:'4690117517235200',id:'4691622045668352'})" />-->
              <!--&lt;!&ndash;<span>更多></span>&ndash;&gt;-->
            <!--</div>-->
            <!--<example-list-->
              <!--:list="jiCeng2"-->
              <!--:showContent="true"-->
              <!--:width="imgWidth"-->
              <!--:height="imgHeigh"-->
              <!--@toDetail="toDetail"-->
            <!--&gt;</example-list>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="example-three">-->
        <!--<div class="title cursor" @click="toList('社会化大普法',{pid:'4690117671736320'})"></div>-->
        <!--<div class="example">-->
          <!--<div>-->
            <!--<div class="moreTitle">-->
              <!--<img :src="rawMap" alt />-->
              <!--&lt;!&ndash;<span class="more"  @click="toList('社会化大普法',{pid:'4690117671736320'})">更多></span>&ndash;&gt;-->
            <!--</div>-->
            <!--<mapZJ :width="width" :menuLists="menuList" :dataLists="dataList" :lists="list" :currentInfos="currentInfo"></mapZJ>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="example examplePF">-->

            <!--&lt;!&ndash; 部门普法，社会普法 &ndash;&gt;-->
          <!--<div>-->
            <!--&lt;!&ndash; 时事 &ndash;&gt;-->
            <!--<div class="moreTitle" >-->
              <!--<img :src="shiShi" alt class="cursor"  @click="toList('社会化大普法',{pid:'4690117671736320',id:'4816260013708288'})" />-->
              <!--&lt;!&ndash;<span>更多></span>&ndash;&gt;-->
            <!--</div>-->
            <!--<socity-raw-->
                    <!--:list="SHFP3"-->
                    <!--:width="rawArtW"-->
                    <!--:height="rawArtH"-->
                    <!--@toDetail="toDetail"-->
            <!--&gt;</socity-raw>-->
          <!--</div>-->
            <!--<div>-->
              <!--&lt;!&ndash; 部门 &ndash;&gt;-->
              <!--<div class="moreTitle">-->
                <!--<img :src="department" alt class="cursor"  @click="toList('社会化大普法',{pid:'4690117671736320',id:'4691622549640192'})" />-->
                <!--&lt;!&ndash;<span>更多></span>&ndash;&gt;-->
              <!--</div>-->
              <!--<socity-raw-->
                <!--:list="SHFP1"-->
                <!--:width="rawArtW"-->
                <!--:height="rawArtH"-->
                <!--@toDetail="toDetail"-->
              <!--&gt;</socity-raw>-->
            <!--</div>-->
            <!--<div>-->
              <!--&lt;!&ndash; 社会 &ndash;&gt;-->
              <!--<div class="moreTitle" >-->
                <!--<img :src="socity" alt class="cursor"  @click="toList('社会化大普法',{pid:'4690117671736320',id:'4691622762091520'})" />-->
                <!--&lt;!&ndash;<span>更多></span>&ndash;&gt;-->
              <!--</div>-->
              <!--<socity-raw-->
                <!--:list="SHFP2"-->
                <!--:width="rawArtW"-->
                <!--:height="rawArtH"-->
                <!--@toDetail="toDetail"-->
              <!--&gt;</socity-raw>-->
            <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="example-four" :style="{width:width+'px'}">-->
        <!--<div class="title cursor" @click="toList('法治文化',{pid:'4688712221660160'})"></div>-->
        <!--<div class="example">-->
          <!--<div>-->
            <!--&lt;!&ndash; 光影颂宪法 也是轮播图 &ndash;&gt;-->
            <!--<img :src="light" alt class="cursor" @click="toList('法治文化',{pid:'4688712221660160',id:'4690112235410432'})" />-->
            <!--<swiper :options="swiperOption" class="swiper2" :style="{width:width+'px'}">-->
              <!--<swiper-slide v-for="item in FZList1" :key="item.id" class="swiper2Item">-->
                <!--<div class="img" @click="toDetail(item)" :href="'/zjfzol/newList?detailId='+item.id" >-->
                  <!--<img :src="item.imgUrl" :style="{width:swiperW+'px',height:swiperH+'px'}" />-->
                <!--</div>-->
                <!--<p @click="toDetail(item)" :href="'/zjfzol/newList?detailId='+item.id" >{{item.nm}}</p>-->
              <!--</swiper-slide>-->

              <!--&lt;!&ndash;<div class="swiper-pagination" slot="pagination"></div>&ndash;&gt;-->
              <!--<div class="swiper-button-prev el-icon-arrow-left" slot="button-prev"></div>-->
              <!--<div class="swiper-button-next el-icon-arrow-right" slot="button-next"></div>-->
            <!--</swiper>-->
          <!--</div>-->
          <!--<div>-->
            <!--<div>-->
              <!--&lt;!&ndash; 法治文艺 &ndash;&gt;-->
              <!--<div class="moreTitle" >-->
                <!--<img :src="rawArt" alt class="cursor"  @click="toList('法治文化',{pid:'4688712221660160',id:'4690112483742720'})"/>-->
                <!--&lt;!&ndash;<span>更多></span>&ndash;&gt;-->
              <!--</div>-->
              <!--<socity-raw :list="FZList2" @toDetail="toDetail" :width="rawArtW" :height="rawArtH"></socity-raw>-->
            <!--</div>-->
            <!--<div>-->
              <!--&lt;!&ndash; 法治动漫书画 &ndash;&gt;-->
              <!--<div class="moreTitle" >-->
                <!--<img :src="anime" alt class="cursor" @click="toList('法治文化',{pid:'4688712221660160',id:'4690112692311040'})" />-->
                <!--&lt;!&ndash;<span>更多></span>&ndash;&gt;-->
              <!--</div>-->
              <!--<example-list-->
                <!--:list="FZList3"-->
                <!--:showContent="false"-->
                <!--:width="cartoonW"-->
                <!--:height="cartoonH"-->
                <!--@toDetail="toDetail"-->
              <!--&gt;</example-list>-->
            <!--</div>-->
            <!--<div>-->
              <!--&lt;!&ndash; 法治故事格言 &ndash;&gt;-->
              <!--<div class="moreTitle">-->
                <!--<img :src="story" alt class="cursor"   @click="toList('法治文化',{pid:'4688712221660160',id:'4690112908776448'})"/>-->
                <!--&lt;!&ndash;<span>更多></span>&ndash;&gt;-->
              <!--</div>-->
              <!--<new-list :list="FZList4" @toDetail="toDetail"></new-list>-->
            <!--</div>-->
          <!--</div>-->
          <!--<home-theme :width="width" :swiperW="swiperW" :swiperH="swiperH"></home-theme>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="example-five">-->
        <!--<div class="title cursor" @click="toList('工作指导',{pid:'4688717847254016'})"></div>-->
        <!--<div class="example">-->
          <!--<div>-->
            <!--&lt;!&ndash; 文件发布 &ndash;&gt;-->
            <!--<div class="moreTitle">-->
              <!--<img :src="file" alt class="cursor"   @click="toList('工作指导',{pid:'4688717847254016',id:'4691626431616000'})"/>-->
              <!--&lt;!&ndash;<span>更多></span>&ndash;&gt;-->
            <!--</div>-->
            <!--<new-list :list="workList1" @toDetail="toDetail"></new-list>-->
          <!--</div>-->
          <!--<div>-->
            <!--&lt;!&ndash; 普法资料 &ndash;&gt;-->
            <!--<div class="moreTitle" >-->
              <!--<img :src="infomation" alt class="cursor" @click="toList('工作指导',{pid:'4688717847254016',id:'4691626668282880'})" />-->
              <!--&lt;!&ndash;<span>更多></span>&ndash;&gt;-->
            <!--</div>-->
            <!--<new-list :list="workList2" @toDetail="toDetail"></new-list>-->
          <!--</div>-->
          <!--<div>-->
            <!--&lt;!&ndash; 工作交流 &ndash;&gt;-->
            <!--<div class="moreTitle" >-->
              <!--<img :src="work" alt class="cursor"  @click="toList('工作指导',{pid:'4688717847254016',id:'4691626862138368'})"/>-->
              <!--&lt;!&ndash;<span>更多></span>&ndash;&gt;-->
            <!--</div>-->
            <!--<new-list :list="workList3" @toDetail="toDetail"></new-list>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="link-list" :style="{width:width+'px'}">-->
        <!--<div class="nav-big-category">-->
          <!--<div-->
            <!--v-for="(item, index) in BIG_CATEGORYLIST"-->
            <!--:class="{active:bigCateIndex===item.id}"-->
            <!--@click="bigCateIndex=item.id"-->
            <!--@mouseover="bigCateIndex=item.id"-->
            <!--:key="index"-->
          <!--&gt;{{item.name}}</div>-->
        <!--</div>-->
        <!--<div class="nav-small-category">-->
          <!--<div-->
            <!--v-for="(item, index) in SMALL_CATEGORYLIST"-->
            <!--:key="index"-->
          <!--&gt;<span @click="toPage(item.url)">{{item.nm}}</span></div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">


// import netImg from "../img/网络直播.png";
// import videoImg from "../img/短视频.png";
// import examplePic from "../img/example.png";
// import examplePic1 from "../img/example1.png";
// import examplePic2 from "../img/example2.png";
// import culture from "../img/法治文化景观.png";
// import panoramic from "../img/法治720度全景.png";
// import shiShi from "../img/shiShi.png";
// import department from "../img/部门普法.png";
// import socity from "../img/社会普法.png";
// import rawMap from "../img/普法地图.png";
// import map from "../img/map.png";
// import plant from "../img/plant.png";
// import light from "../img/光影颂宪法.png";
// import rawArt from "../img/法治文艺.png";
// import anime from "../img/动漫书画.png";
// import story from "../img/故事格言.png";
// import file from "../img/文件发布.png";
// import infomation from "../img/普法资料.png";
// import work from "../img/工作交流.png";
// import artExample from "../img/art-example.png";
//
// import Vue from 'vue';
// import { Carousel,
//   CarouselItem,} from 'element-ui';
// import ThemeList from "../components/themeList";
// Vue.use(Carousel);
// Vue.use(CarouselItem);
//
//
// const ExampleList = resolve => require(['@/components/ExampleList.vue'],resolve)
// const SocityRaw = resolve => require(['@/components/SocityRaw.vue'],resolve)
// const NewList = resolve => require(['@/components/NewList.vue'],resolve)
// const mapZJ = resolve => require(['@/components/mapData.vue'],resolve)
// const videoShow = resolve => require(['@/components/videoShow.vue'],resolve)
// const homeTheme = resolve => require(['@/components/homeTheme.vue'],resolve)
// const homeAdvert = resolve => require(['@/components/homeAdvert.vue'],resolve)
export default {
  head:{
    script: [
    ]
  },
  layout:'close',
  data() {
    return {
      name:'',
      width: 1000,
      bWidth: 0,
        bannerHeight:'',
        advertLeft:[],//左边浮窗
        advertRight:[], //右边浮窗
        videoShow:false, //抖音播放
        currentIndex:0,//抖音当前播放视频
        videoInfo:{},//抖音当前播放视频信息
        loading:true,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },

      // netImg,
      // videoImg,
      // examplePic,
      // examplePic1,
      // examplePic2,
      // culture,
      // panoramic,
      // department,
      // socity,
      // rawMap,
      // map,
      // plant,
      // light,
      // rawArt,
      // anime,
      // story,
      // artExample,
      // file,
      // infomation,
      // work,
      //   shiShi,
        newTotal:[],
      topNew: [[]],
      selectTab: 1,
      bannerList: [],
      bannerList2: [],
      bannerList3: [],
      bannerList4:[],
      FZList: [[], [], [], []], //法治文化栏目
      FZList1: [],
      FZList2: [],
      FZList3: [],
      FZList4: [],
      themeList:[],
      workList: [[], [], []], //工作指导栏目
      workList1: [],
      workList2: [],
      workList3: [],
      puFaList: [[], []], //普法
      puFaList1: [[]],
      puFaList2: [{'lawDouyinVo':{}},{'lawDouyinVo':{}}],
      SHFP: [[], []], //社会大普法栏目
      SHFP1: [],
      SHFP2: [],
        SHFP3: [],
      jiCeng: [[], []], //基层栏目
      jiCeng1: [],
      jiCeng2: [],
      map: {},
      TAB_List: [
        {
          id: "4536030838313984",
          value: "法治新闻"
        },
        { id: "4688704618075136", value: "工作动态" }
      ],
      TAB_New_List: [],
      newList: [],

      bigCateIndex: 1,
      BIG_CATEGORYLIST: [],
      SMALL_CATEGORYLIST: [],

      menuList:[],  //普法地图数据
      dataList:[],
      currentInfo:[],
      list:[],
    };
  },
  // components: {
  //   ThemeList,
  //   ExampleList,
  //   SocityRaw,
  //   NewList,
  //   mapZJ,
  //   videoShow,
  //   homeTheme,
  //   homeAdvert
  // },
  computed: {
    /*解决1680*1050分辨率电脑的问题*/
    imgWidth() {
      return Math.ceil(((this.width * 0.98 - 60) / 2) * 0.48);
    },
    imgHeigh() {
      return Math.floor((this.imgWidth * 244) / 430);
    },
    commonRawW() {
      return Math.floor((this.width * 0.98 - 60) / 4);
    },
    commonRawH() {
      return Math.floor((this.commonRawW * 244) / 430);
    },
    rawArtW() {
      return Math.floor((this.width - 30) / 6);
    },
    rawArtH() {
      return Math.floor((this.rawArtW * 244) / 430);
    },
    cartoonW() {
      return Math.floor(((this.width - 30) / 3 - 16) / 2);
    },
    cartoonH() {
      return Math.floor((this.cartoonW * 244) / 430);
    },
    swiperW() {
      return Math.ceil((Math.ceil(this.width - 30) * 0.9) / 4);
    },
    swiperH() {
      return Math.ceil((this.swiperW * 244) / 430);
    },
    funRawW() {
      return Math.ceil((this.width * 0.7) / 2);
    },
    funRawH() {
      return Math.ceil((this.funRawW * 244) / 430);
    }
  },
  mounted() {

    // this.getWidth()
    // this.getBanner();
    // this.init();
  },
  watch: {
    bigCateIndex() {
      this.getLinkList();
    }
  },
  async asyncData(context){
    return
    if(process.client){
      return
    }
    let qryThemel = context.app.query.new();
    context.app.query.toW(qryThemel, "themeId", 1, "EQ");
    context.app.query.toO(qryThemel,'crtTm','desc')
    context.app.query.toP(qryThemel, 1,20);
    let[newsData,linkData,themeList] = await Promise.all([
      context.app.api.getHomeNew(), //新闻
      context.app.api.getLink() ,//友情链接分类
      context.app.api.themeList(encodeURIComponent(context.app.query.toJsonStr(qryThemel))) //专题
    ])
    let linkList = await context.app.api.getLinkList(linkData[0].id) //友情链接列表

    //普法地图
    let id = '4688704618075136'
    let qry = context.app.query.new();
    context.app.query.toW(qry, "pid", id, "EQ");
    context.app.query.toO(qry, "sort", "asc");
    let menuList = await context.app.api.getMenuNav(
      encodeURIComponent(context.app.query.toJsonStr(qry))
    );
    let param = {
      catId:menuList[0].id,
      siteId:1,
      pageNo:1,
      pageSize:10
    }
    let data = await context.app.api.getAllList(param);
    data.data.list.forEach(item => {
      item.releTm = item.releTm ? item.releTm.split(" ")[0] : "";
    });    //普法地图结束


    return {
      //普法地图数据
      menuList : menuList,
      dataList : menuList,
      currentInfo : menuList[0],
      list : data.data.list,
      themeList:themeList,
      SMALL_CATEGORYLIST:linkList,
      BIG_CATEGORYLIST : linkData,
      bigCateIndex : linkData[0].id,
      newTotal : newsData,
      selectTab : '4536030838313984', //tab选项默认显示法治新闻
      TAB_New_List : newsData['4536030838313984'],
      // loading : false,
      newList : newsData["4691603005625344"],  //通知公告
      FZList1 :  newsData["4690112235410432"], //光影
      FZList2 :  newsData["4690112483742720"], //法治文艺
      FZList3 :  newsData["4690112692311040"],  //法治动漫书画
      FZList4 :  newsData["4690112908776448"], //法治故事格言
      puFaList1 :  newsData["4691583290561536"], //“浙里话”宪法直播
      puFaList2 :  newsData["4691583942480896"], //普法抖音短视频
      SHFP1 :  newsData["4691622549640192"], //部门普法
      SHFP2 :  newsData["4691622762091520"], //社会普法
      SHFP3 :  newsData["4816260013708288"], //时事热评
      jiCeng1 :  newsData["4691621767517184"], //法治文化景观
      jiCeng2 :  newsData["4691622045668352"], //法治720度全景
      workList1 :  newsData["4691626431616000"], //文件发布
      workList3 :  newsData["4691626862138368"], //工作交流
      workList2 :  newsData["4691626668282880"] //普法资料
    }


  },
  methods: {
    getWidth() {
      let width = document.body.clientWidth;
      if (width < 1000) {
        this.width = 1000;
        this.bWidth = 1000;
      }
      if (width >= 1000 && width <= 1200) {
        this.width = width;
        this.bWidth = width;
      }
      if (width > 1200) {
        this.width = 1200;
        this.bWidth = width;
      }

    },
    async init() {
      this.selectTab = this.TAB_List[0].id; //切换项
      this.getNews()
      await this.getLink(); //友情链接
    },
    //关闭浮窗广告
    closeAdvert(type,index){
      if(type=='left'){
          this.advertLeft.splice(index,1)
      }
      if(type=='right'){
          this.advertRight.splice(index,1)
      }
    },
    changeTab(id){
      // console.log(this.newTotal)
        this.selectTab = id
        this.TAB_New_List = this.newTotal[this.selectTab]
    },
    //关闭抖音
    close(){
        this.videoShow = false
    },
      //抖音切换上一个 下一个
      changeVideo(type){
          if(type==='pre' && this.currentIndex>0){
              this.currentIndex--
              this.videoInfo = this.puFaList2[this.currentIndex]
          }
          if(type==='next' && this.currentIndex<this.puFaList2.length-1){
              this.currentIndex++
              this.videoInfo = this.puFaList2[this.currentIndex]
          }
      },
      //跳转到抖音播放页面
      toDouYin(item){
          this.api.douYinRead(item.id).then(()=>{
              window.open(item.shareUrl)

          })
        // window.open(url)
      },
      //播放抖音
      toShow(index){
          this.currentIndex = index
          this.videoInfo = this.puFaList2[index]
          this.videoShow = true
      },
      async getNews(){
        let params = {
          siteId:3
        }
        let data = await this.api.getHomeNew()
          this.newTotal = data
          this.selectTab = this.TAB_List[0].id
          this.TAB_New_List = this.newTotal[this.selectTab]
          this.loading = false
        this.newList = data["4691603005625344"]  //通知公告
        this.FZList1 =  data["4690112235410432"] //光影
        this.FZList2 =  data["4690112483742720"] //法治文艺
        this.FZList3 =  data["4690112692311040"]  //法治动漫书画
        this.FZList4 =  data["4690112908776448"] //法治故事格言
        this.puFaList1 =  data["4691583290561536"] //“浙里话”宪法直播
        this.puFaList2 =  data["4691583942480896"] //普法抖音短视频
        this.SHFP1 =  data["4691622549640192"] //部门普法
        this.SHFP2 =  data["4691622762091520"] //社会普法
          this.SHFP3 =  data["4816260013708288"] //时事热评
        this.jiCeng1 =  data["4691621767517184"] //法治文化景观
        this.jiCeng2 =  data["4691622045668352"] //法治720度全景
        this.workList1 =  data["4691626431616000"] //文件发布
        this.workList3 =  data["4691626862138368"] //工作交流
        this.workList2 =  data["4691626668282880"] //普法资料
      },
    //友情链接
    async getLink() {
      this.BIG_CATEGORYLIST = await this.api.getLink();
      this.bigCateIndex = this.BIG_CATEGORYLIST[0].id;
    },
    //友情链接列表
    async getLinkList() {
      this.SMALL_CATEGORYLIST = await this.api.getLinkList(this.bigCateIndex);
    },


    async getBanner() {
        //专题广告
        this.bannerList2 = await this.api.getAdr('topic')
        this.bannerList4 = await this.api.getAdr('topicYASF')
      let data = await this.api.getHomeBanner()
        //画轴广告
        this.bannerList = data.ADPOSPC001
      this.bannerList.forEach(item=>{
        if(item.locUrl.indexOf('www.zjfzol.com.cn/pc')>-1){
          item.locUrl = window.location.origin+'/pc'+item.locUrl.split('#')[1]
        }
      })
        //右边四个广告
        // this.bannerList3 = data.ADPOSPC005
      this.bannerList3 = await this.api.getAdr('ADPOS.PC005')
        this.bannerList3.forEach(item=>{
          if(item.locUrl.indexOf('www.zjfzol.com.cn/pc')>-1){
            item.locUrl = window.location.origin+'/zjfzol'+item.locUrl.split('#')[1]
          }
        })
        //顶部新闻
        this.topNew = data.ADPOSPC008

     this.advertLeft = await this.api.getAdr('advert',8)
     this.advertRight = await this.api.getAdr('advertRight',8)


        // console.log(this.bannerList2)
        // let img = new Image()
        // img.src=this.bannerList2[0].imgUrl
        // img.onload =()=>{
        //   this.bannerHeight = this.width*img.height/img.width+'px'
        //     console.log(img.width)
        // }
    },



    toList(nm, item) {
      let param = {}
      if(item.pid){
        param = {
          nm: nm, //上级栏目名字
          id: item.pid, //上级栏目id
          sId: item.id //当前栏目id
        };
      }else {
        param = {
          nm: nm, //上级栏目名字
          id: item.id, //上级栏目id
        };
      }

      this.$router.push({ path: "/newList", query: param });
    },
    toDetail(info) {
      // this.until.seSave('detailId',info.id)
      this.$router.push({
        path: "/newList",
        query: {
          detailId: info.id,
          time:new Date().getTime()
        }
      });

    },

    toPage(url) {
      this.until.href(url);
    }
  }
};
</script>
<style lang="less">


#home{
  .swiper-wrapper {
    padding: 0 0 20px;
    box-sizing: border-box;
  }
  .el-carousel--vertical{
    height: 100%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    background-image: none !important;
    font-size: 50px;
    color: #999999;
    top: 42%;
  }
  .swiper-button-prev:after, .swiper-container-rtl .swiper-button-next:after{
    display: none;
  }
}

  .swiper.block .el-carousel.el-carousel__indicators {
  left: 80%;
  transform: translateX(0);
  .el-carousel__button {
    width: 10px;
    height: 10px;
  }
  .is-active {
    .el-carousel__button {
      background-color: #ff2400;
    }
  }
}
</style>
<style lang="less" scoped>
@import url("../assets/css/init.less");
#home {
  margin: 0 auto;
  width: 100%;
  /*background-color: #009ad6;*/
  /*min-height: 700px;*/
  table{
    /*height: 100%;*/
    line-height: 50px;
    color: #333333;
  }
  .more{
    cursor: pointer;
    color: #666666;
      text-align: right;
  }
  .moreTitle{
    width: 100%;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    /*cursor: pointer;*/
    span{
      flex: 1;
      text-align: right;
      color: #666666;
    }
  }
  .advertLeft{
    left: 0;
  }
  .advertRight{
    right: 0;
  }
  .advertLeft,.advertRight{
    position: fixed;
    z-index: 99;
    top:20%;
    i{
      position: absolute;
      top:0;
      right: 0;
      color: #ffffff;
      cursor: pointer;
      background: rgba(0,0,0,0.7);
      border-radius: 100%;
      font-size: 16px;
    }
    img{
      width: auto;
      max-width: 100%;
      height: auto;
    }
  }
  .swiper2 {
    .swiper2Item {
      width: 22% !important;
      margin-left: 0.8%;
      margin-right: 0.8% !important;
      cursor: pointer;
      &:nth-of-type(4n + 1) {
        margin-left: 9%;
      }
      &:first-of-type {
        margin-left: 4.5%;
      }

      .img {
        width: 100%;
        display: flex;
        display: -webkit-flex;
        img {
          margin: auto;
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
        }
      }
      p {
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  /*background: url("../img/bg.png") repeat center;*/
  h1 {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    color: #0064b2;
    padding: 50px 0;
  }
  .new-list {
    width: 100%;
    margin: 0 auto 20px;
    display: flex;
    display: -webkit-flex;
    flex-flow: row nowrap;
    align-items: center;
    .swiper {
      /*width: 492px;*/
      /*background: url("../img/卷轴.png") no-repeat center center;*/
      /*background-size: 100% 100%;*/
      display: flex;
      display: -webkit-flex;
      .block {
        width: 100%;
        height: 100%;
        margin: auto;
        overflow: hidden;
        .el-carousel {
          height: 100%;
          .img {
            position: relative;
            width: 100%;
            height: 100%;
            cursor: pointer;
            img {
              width: auto;
              height: auto;
              max-width: 100%;
              max-height: 100%;
            }
            p {
              position: absolute;
              text-align: left;
              z-index: 9;
              background: rgba(0, 0, 0, 0.5);
              color: #ffffff;
              width: 100%;
              bottom: 0;
              left: 0;
              line-height: 40px;
              height: 40px;
              padding-left: 10px;
              box-sizing: border-box;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }
          }
        }
      }
    }
    .tab-show {
      width: 35%;
      margin-left: 3%;
      margin-right: 1.5%;
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      .tab-header {
        background: url("../img/tab.png") no-repeat top center;
        background-size: cover;
        display: flex;
        display: -webkit-flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        border-radius: 5px 5px 0 0;
        height: 40px;
        > div {
          margin: 3px 5px 0;
          text-align: center;
          flex: 1;
          height: 35px;
          line-height: 35px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          color: #ffffff;
        }
        .active {
          background-color: #fff;
          color: #0064b2;
        }
      }
      h3 {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        height: 20px;
        line-height: 20px;
        margin: 20px 0 10px;
        overflow: hidden;
        p{
          cursor: pointer;
          display: inline-block;
        }
        p:hover{
          text-decoration: underline;
        }
      }
      >p {
        padding-bottom: 10px;
        font-size: 14px;
        color: #333;
        text-indent: 20px;
        line-height: 2;
        border-bottom: 1px dashed #b4b4b4;
        span {
          color: #f00;
        }
      }
      ul {
        flex: 1;
        padding-top: 20px;
        font-size: 16px;
        color: #333;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        justify-content: space-between;
        .more{
          padding-top: 15px;
        }
        li {
          height: 30px;
          line-height: 30px;
          display: flex;
          display: -webkit-flex;
          overflow: hidden;
          align-items: center;
          p{
            display: inline-block;
            height: 30px;
            overflow: hidden;
          }
          &::before {
            flex-shrink:0;
            content: "";
            display: block;
            width: 3px;
            height: 3px;
            line-height: 3px;
            background-color: #333;
            color: #333;
            margin-right: 5px;
          }
        }
      }
    }
    .note-show {
      width: 23%;
      box-sizing: border-box;
      padding: 15px 20px 0 2%;
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      .title{
        /*display: flex;*/
        /*display: -webkit-flex;*/
        /*align-items: center;*/
        p {
          font-size: 16px;
          font-weight: 700;
          display: inline-block;
          cursor: pointer;
        }
        margin-bottom: 20px;
      }

      ul {
        color: #333;
        flex: 1;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        justify-content: space-around;
        li {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          &::before {
            flex-shrink: 0;
            content: "";
            display: inline-block;
            width: 3px;
            height: 3px;
            background-color: #333;
            color: #333;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .banner {
    margin: 0 auto;
    text-align: center;
    img{
      width: auto;
      max-width: 100%;
      cursor: pointer;
      margin-bottom: 20px;
    }
  }
  .banner2{
    margin: 0 auto;
    img {
      height: auto;
      width: 49%;
      cursor: pointer;
      &:nth-of-type(2n+1){
        margin-right: 2%;
      }
    }
  }
  .example-one {
    width: 100%;
    margin: 20px auto;
    display: flex;
    display: -webkit-flex;
    flex-flow: row nowrap;
    .video-examples{
      display: flex;
      display: -webkit-flex;
      .video-example{
        position: relative;
        flex: 1;
        .img{
          background-position: top center;
          background-repeat: no-repeat;
          background-size: cover;
          cursor: pointer;
        }
        &:first-of-type{
          margin-right: 30px;
        }
      }
    }

    > div {
      &:nth-of-type(1) {
        width: 73%;
        margin-right: 1.5%;
        .common-law {
          height: 60px;
          background: url("../img/玩转普法.png") no-repeat;
          background-size: cover;
        }
        .example {
          display: flex;
          display: -webkit-flex;
          flex-flow: row nowrap;
          margin-top: 25px;
          > div {
            width: 50%;
            .img {
              width: 100%;
              img {
                cursor: pointer;
                width: auto;
                height: auto;
                max-width: 100%;
                max-height: 100%;
                vertical-align: middle;
              }
            }
            > div {
              position: relative;
              margin-top: 20px;
              display: flex;
              display: -webkit-flex;
              /*cursor: pointer;*/
              img {
                /*margin: auto;*/
                width: auto;
                height: auto;
                max-width: 100%;
                max-height: 100%;
                vertical-align: middle;
              }
              p {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 40px;
                line-height: 40px;
                background-color: rgba(0, 0, 0, 0.7);
                color: #fff;
                text-indent: 20px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
              }
            }
            &:nth-last-of-type(1) {
              margin-left: 4%;
            }
          }
        }
      }
      &:nth-of-type(2) {
        width: 24%;
        margin-left: 1.5%;
        display: flex;
        display: -webkit-flex;
        flex-flow: column wrap;
        justify-content: space-between;
        img {
          width: 100%;
          height: auto;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .example-two {
    margin: 0 auto;
    .title {
      height: 100px;
      background: url("../img/基础依法治理.png") no-repeat;
    }
    .example {
      background-color: rgba(255, 255, 255, 0.5);
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      padding: 30px;
      > div {
        width: 49%;
        &:first-of-type {
          margin-right: 2%;
        }
      }
    }
  }
  .example-three {
    width: 100%;
    margin: 0 auto;
    .title {
      margin: 20px 0 0;
      height: 100px;
      background: url("../img/社会化大普法.png") no-repeat top center;
      background-size: contain;
    }
    .example {
      background-color: rgba(255, 255, 255, 0.5);
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      padding: 30px;

      /*> div {*/
        /*width: 49%;*/
        /*&:nth-of-type(1){*/
          /*>div{*/
            /*&:nth-of-type(2){*/
              /*margin-top: 20px;*/
            /*}*/
          /*}*/
        /*}*/
        /*&:nth-of-type(2) {*/
          /*margin-left: 2%;*/
          /*.map {*/
            /*padding-top: 20px;*/
          /*}*/
        /*}*/
      /*}*/
    }
    .examplePF{
      >div{
        flex: 1;
        flex-shrink: 0;
        &:nth-of-type(2){
          margin-left: 2%;
          margin-right: 2%;
        }
      }
    }
  }
  .example-four {
    width: 1200px;
    margin: 0 auto;
    .title {
      margin: 20px 0 10px;
      height: 100px;
      background: url("../img/法治文化.png") no-repeat top center;
      background-size: contain;
    }
    .example {
      /*background-color: rgba(246, 246, 246, 0.6);*/
      /*display: flex;*/
      /*display: -webkit-flex;*/
      /*flex-flow: column wrap;*/
      /*justify-content: space-between;*/
      /*padding: 30px;*/

      > div {
        /*flex: 1;*/
        &:nth-of-type(2) {
          display: flex;
          display: -webkit-flex;
          flex-flow: row nowrap;
          > div {
            flex: 1;
            &:not(:nth-last-of-type(1)) {
              margin-right: 15px;
            }
          }
        }
      }
    }
  }
  .example-five {
    width: 100%;
    margin: 15px auto 0;
    .title {
      /*margin: 20px 0;*/
      height: 100px;
      background: url("../img/工作指导.png") no-repeat top center;
      background-size: contain;
    }
    .example {
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      > div {
        flex: 1;
        &:not(:nth-last-of-type(1)) {
          margin-right: 20px;
        }
      }
    }
  }
  .link-list {
    width: 1200px;
    margin: 40px auto 40px;
    .nav-big-category {
      display: flex;
      flex-flow: row nowrap;
      font-size: 18px;
      border-bottom: 1px solid #d7d7d7;
      > div {
        padding: 15px 20px;
        &:not(:nth-of-type(1)) {
          margin-left: 5%;
        }

      }

      .active {
        border-bottom: 1px solid #f00;
        color: #f00;
        font-weight: 700;
      }
    }
    .nav-small-category {
      color: #333;
      display: flex;
      display: -webkit-flex;
      flex-flow: row wrap;
      /*justify-content: space-between;*/
      font-size: 16px;
      > div {
        width: 13%;
        padding: 20px 0 0 10px;
        span{
          cursor: pointer;
        }
        span:hover {
          text-decoration: underline;
          color: @themeColor;
        }
      }

    }
  }
}
</style>
<style lang="less">
.el-carousel__container {
  height: 100% !important;
}
.el-carousel--horizontal {
  height: 100%;
}
.el-carousel__indicators--horizontal {
  right: 5%;
  left: auto;
  .el-carousel__button {
    width: 10px;
    height: 10px;
    background: #a7a7a7;
  }
  .is-active .el-carousel__button {
    background: #ff2400;
  }
}
.el-carousel__item {
  .img {
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    img {
      margin: auto;
    }
  }
  p {
    text-align: center;
  }
}
/*.el-carousel__item h3 {*/
/*color: #475669;*/
/*font-size: 14px;*/
/*opacity: 0.75;*/
/*line-height: 150px;*/
/*margin: 0;*/
/*}*/

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/*.el-carousel__item h3 {*/
/*color: #475669;*/
/*font-size: 14px;*/
/*opacity: 0.75;*/
/*line-height: 150px;*/
/*margin: 0;*/
/*}*/

/*.el-carousel__item:nth-child(2n) {*/
/*background-color: #99a9bf;*/
/*}*/

/*.el-carousel__item:nth-child(2n + 1) {*/
/*background-color: #d3dce6;*/
/*}*/
</style>
