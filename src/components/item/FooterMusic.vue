<template>
  <div class="footermusic-container">
    <div class="item-pic">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
    </div>
    <div class="item-song">
      <!-- 歌名 -->
      <p>{{ playList[playListIndex].name }}</p>
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
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  setup(props) {
    return {}
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
    ...mapMutations(['updateIsPlaying'])
  },
  computed: {
    //通过辅助函数进行解构数据
    ...mapState(['playList', 'playListIndex', 'isPlaying'])
    //解构方法
  },
  watch: {
    //监听，若当前播放的音乐发生改变，即playListIndex发生变化
    playListIndex() {
      //则自动播放音乐
      this.$refs.audio.autoplay = true
      //并且图标改为暂停状态
      this.updateIsPlaying(false)
    }
  },
  mounted() {
    console.log(this.$refs)
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
    p {
      font-weight: 700;
      //文字不换行
      white-space: nowrap;
    }
    span {
      font-size: 0.2rem;
      color: #999;
      margin-top: 0.1rem;
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
