<template>
  <div class="footermusic-container">
    <div class="item-pic" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
    </div>
    <div class="item-song" @click="updateDetailShow">
      <!-- 歌名，使用跑马灯 -->
      <div class="songname">
        <Vue3Marquee>{{ playList[playListIndex].name }}</Vue3Marquee>
      </div>
      <span>横滑可以切换上下首哦~</span>
    </div>
    <div class="item-play" @click="play">
      <svg class="icon" aria-hidden="true" v-if="isPlaying">
        <use xlink:href="#icon-wyybofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else>
        <use xlink:href="#icon-wyyzanting"></use>
      </svg>
    </div>
    <div class="item-list">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-wyyliebiaoxuanze-"></use>
      </svg>
    </div>
    <!-- 音乐播放audio -->
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
    <!-- 歌曲详情弹出层 -->
    <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%', width: '100%' }">
      <!-- 歌曲详情页，并且父传子，将当前播放的歌曲传给子 -->
      <MusicDetail :musicItem="playList[playListIndex]" :play="play" :isPlaying="isPlaying"></MusicDetail>
    </van-popup>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import MusicDetail from './MusicDetail.vue'
//按需导入跑马灯组件
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'

export default {
  setup(props) {
    return {}
  },
  components: {
    MusicDetail,
    Vue3Marquee
  },
  methods: {
    play() {
      //判断音乐是否播放
      if (this.$refs.audio.paused) {
        //如果为暂停，就播放
        this.$refs.audio.play()
        //然后把按钮设置成暂停
        this.updateIsPlaying(false)
      } else {
        //如果在播放，就暂停
        this.$refs.audio.pause()
        //然后把按钮设置成播放
        this.updateIsPlaying(true)
      }
    },
    //通过辅助函数进行解构方法
    ...mapMutations(['updateIsPlaying', 'updateDetailShow'])
  },
  computed: {
    //通过辅助函数进行解构数据
    ...mapState(['playList', 'playListIndex', 'isPlaying', 'detailShow'])
    //解构方法
  },
  watch: {
    //监听，若当前播放的音乐发生改变，即playListIndex或者播放列表playlist发生变化
    playListIndex() {
      //则自动播放音乐
      this.$refs.audio.autoplay = true
      //并且图标改为暂停状态
      this.updateIsPlaying(false)
    },
    playList() {
      this.$refs.audio.autoplay = true
      //判断按钮为暂停状态时，就改为播放
      if (this.isPlaying) {
        //则自动播放音乐
        this.$refs.audio.autoplay = true
        //并且图标改为暂停状态
        this.updateIsPlaying(false)
      }
    }
  },
  mounted() {
    // 打印audio
    // console.log(this.$refs)
  },
  updated() {
    //sction 通过 store.dispatch 方法触发：
    //传参：当前多播放音乐的id
    this.$store.dispatch('getMusicLyric', this.playList[this.playListIndex].id)
  }
}
</script>

<style lang="less" scoped>
.footermusic-container {
  width: 100%;
  height: 1.2rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;

  .item-pic {
    width: 16%;
    img {
      width: 100%;
      height: 100%;
      padding: 0.12rem;
      border-radius: 50%;
    }
  }
  .item-song {
    width: 52%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .songname {
      font-weight: 700;
      //文字不换行
      white-space: nowrap;
    }
    span {
      font-size: 0.2rem;
      color: #999;
      margin-top: 0.1rem;
      text-align: center;
    }
  }
  .item-play {
    width: 16%;
    .icon {
      width: 100%;
      height: 100%;
      padding: 0.26rem;
    }
  }
  .item-list {
    width: 16%;
    .icon {
      width: 100%;
      height: 100%;
      padding: 0.26rem;
    }
  }
}
</style>
