<style lang="less" scoped>
    @import url("../assets/css/init.less");
    .video{
        width: 100%;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        .main{
            margin: auto;
            height: 95%;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            .ctrol{
                padding-left: 20px;
                p{
                    margin: 40px 0;
                    img{
                        cursor: pointer;
                    }
                }
            }
        }
        span{
            position: fixed;
            top:0.1rem;
            right: 0.1rem;
            z-index: 100;
            cursor: pointer;
            color: #ffffff;
            font-size: 30px;
        }
    }
</style>
<style>

</style>

<template>
    <div class="video">
        <video :src="info.linkUrl" controls="controls" style="width: 100%">
            您的浏览器不支持 video 标签。
        </video>
        <!--<video-player class="video-player vjs-custom-skin"-->
                      <!--ref="videoPlayer"-->
                      <!--:playsinline="true"-->
                      <!--style="object-fit:contain"-->
                      <!--:style="{width:width+'px'}"-->
                      <!--:options="playerOptions"-->
                      <!--:x5-video-player-fullscreen="true"-->
                      <!--@pause="onPlayerPause($event)"-->
                      <!--@play="onPlayerPlay($event)"-->
                      <!--@fullscreenchange="onFullscreenChange($event)"-->
                      <!--@click="fullScreen"-->
        <!--&gt;-->
        <!--</video-player>-->
    </div>
</template>

<script>

    // //引入视频
    // import VideoPlayer from 'vue-video-player'
    // import 'video.js/dist/video-js.css'
    // import 'vue-video-player/src/custom-theme.css'
    // import 'videojs-playlist/dist/videojs-playlist'
    // import 'videojs-playlist-ui/dist/videojs-playlist-ui'
    // import 'videojs-playlist-ui/dist/videojs-playlist-ui.vertical.css'
    // // Vue.use(VideoPlayer)
    //
    // import {videoPlayer} from 'vue-video-player';
    // import pre from './img/pre.png'
    // import next from './img/next.png'
  export default {
    props: {
      info: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {

      }
    },
    components:{},
      watch:{
        info:{
            deep:true,
            handler:function () {
                // console.log('数据变化')
                // this.setUrl(this.info)
            }
        }
      },
    mounted() {
        // let h = document.documentElement.clientHeight
        // this.width = h*0.95 * (750/1334)
        // // this.playerOptions.sources[0].src = this.url
        // this.setUrl(this.info)
    },
    computed: {
      player() {
          // return this.$refs.videoPlayer.player
      }
    },
    methods: {

        // fullScreen() {
        //     const player = this.$refs.videoPlayer.player
        //     player.requestFullscreen()//调用全屏api方法
        //     player.isFullscreen(true)
        //     player.play()
        // },
        // onPlayerPlay(player) {
        //     player.play()
        // },
        // onPlayerPause(player) {
        //     // alert("pause");
        // },
        // setUrl(info){
        //   this.playerOptions.sources[0].src = info.linkUrl
        //     this.playerOptions.poster = info.imgUrl
        // }
    }
  }
</script>