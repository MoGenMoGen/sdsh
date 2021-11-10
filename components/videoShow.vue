<style lang="less" scoped>
    @import url("../assets/css/init.less");
    .video{
        background: rgba(0,0,0,0.6);
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 99;
        top:0;
        left:0;
        box-sizing: border-box;
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
        <span class="el-icon-close" @click="close"></span>
        <div class="main">
            <video-player class="video-player vjs-custom-skin"
                          ref="videoPlayer"
                          :playsinline="true"
                          style="object-fit:contain"
                          :style="{width:width+'px'}"
                          :options="playerOptions"
                          :x5-video-player-fullscreen="true"
                          @pause="onPlayerPause($event)"
                          @play="onPlayerPlay($event)"
                          @fullscreenchange="onFullscreenChange($event)"
                          @click="fullScreen"
            >
            </video-player>
            <div class="ctrol">
                <p><img :src="pre" @click="changeVideo('pre')"/></p>
                <p><img :src="next" @click="changeVideo('next')"/></p>
            </div>
        </div>
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
    // Vue.use(VideoPlayer)

    // import {videoPlayer} from 'vue-video-player';
    import pre from './img/pre.png'
    import next from './img/next.png'
  export default {
    props: {
      info: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
          pre,
          next,
          width:0,
          playerOptions: {
//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
              autoplay: true, //如果true,浏览器准备好时开始回放。
              muted: false, // 默认情况下将会消除任何音频。
              loop: false, // 导致视频一结束就重新开始。
              preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
              language: 'zh-CN',
              aspectRatio: '750:1334', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
              fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
              sources: [{
                  type: "video/mp4",
                  src: ""
              }],
              poster: "你的封面地址",
              width: document.documentElement.clientWidth,
              notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
              controlBar: {
                  // timeDivider: true,
                  // durationDisplay: true,
                  // remainingTimeDisplay: false,
                  fullscreenToggle: true  //全屏按钮
              }
          }
      }
    },
    components:{
      // videoPlayer
    },
      watch:{
        info:{
            deep:true,
            handler:function () {
                // console.log('数据变化')
                this.setUrl(this.info)
            }
        }
      },
    mounted() {
        let h = document.documentElement.clientHeight
        this.width = h*0.95 * (750/1334)
        // this.playerOptions.sources[0].src = this.url
        this.setUrl(this.info)
    },
    computed: {
      player() {
          return this.$refs.videoPlayer.player
      }
    },
    methods: {
        changeVideo(type){
          this.$emit('changeVideo',type)
        },
        fullScreen() {
            const player = this.$refs.videoPlayer.player
            player.requestFullscreen()//调用全屏api方法
            player.isFullscreen(true)
            player.play()
        },
        onPlayerPlay(player) {
            player.play()
        },
        onPlayerPause(player) {
            // alert("pause");
        },
        setUrl(info){
          this.playerOptions.sources[0].src = info.linkUrl
            this.playerOptions.poster = info.imgUrl
        },
        close(){
            this.$emit('close')
        }
    }
  }
</script>
