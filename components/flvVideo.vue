<template>
  <div class="video">
    <video
      class="video-component"
      ref="videoElement"
      id="flvVideo"
      controls
      autoplay
    >Your browser is too old which doesn't support HTML5 video.</video>
  </div>
</template>
<script>
import flvjs from "flv.js";
export default {
  name: "Video",
  props: {
    types: {
      type: String,
      default: "flv"
    },
    url: {
      types: String,
      default: ""
    }
  },
  data() {
    return {
      flvPlayer: null
    };
  },
  watch: {
    url() {
      if (this.flvPlayer) {
        this.flvPlayer.detachMediaElement();
        this.flvPlayer.destroy();
      }
      this.createVideo();
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.createVideo();
    });
  },
  methods: {
    createVideo() {
        window.console.log(this.types)
        window.console.log(this.url)
      // const videoElement = this.$refs.videoElement;
        let videoElement = document.getElementById('flvVideo')
      this.flvPlayer = flvjs.createPlayer({
        type: this.types,
        url: this.url
      });
      // this.flvPlayer.attachMediaElement(videoElement);
      // this.flvPlayer.load();
    }
  }
};
</script>
