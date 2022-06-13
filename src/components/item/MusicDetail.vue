<template>
  <div class="musicdetail-container">
    <!-- 背景图片虚化 -->
    <img :src="musicItem.al.picUrl" alt="" class="bgimg" />
    <!-- 顶部导航 -->
    <div class="top-nav">
      <!-- 三栏布局，左边一个返回，中间歌名，右边分享 -->
      <div class="top-left" @click="updateDetailShow">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wyyzuojiantou"></use>
        </svg>
      </div>
      <div class="top-mid">
        <!-- 歌名，使用跑马灯 -->
        <div class="songname">
          <Vue3Marquee>{{ musicItem.name }}</Vue3Marquee>
        </div>
        <!-- 循环遍历所有歌手 -->
        <div class="singername">
          <span v-for="singer in musicItem.ar" :key="singer.id">/{{ singer.name }} </span>
        </div>
      </div>
      <div class="top-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wyyfenxiang"></use>
        </svg>
      </div>
    </div>

    <!-- 中间内容，黑胶唱片 -->
    <div class="mid-content">
      <img src="@/assets/cdmusic.png" alt="" class="cd" />
      <img src="@/assets/cizhen.png" alt="" class="cz" />
      <img :src="musicItem.al.picUrl" alt="" class="cpic" />
    </div>

    <!-- 底部控制区 -->
    <div class="footer-control">
      <!-- 下载收藏一系列按钮 -->
      <div class="footer-btns">
        <!-- 五个图标 -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wyyaixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wyyxiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wyyyinlechangpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wyyxiaoxi"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wyykongxinwenhao"></use>
        </svg>
      </div>
      <!-- 进度条区 -->
      <div class="footer-progressbar">
        <hr />
      </div>
      <!-- 底部播放按钮区 -->
      <div class="footer-play">
        <!-- 也是五个图标 -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wyyxunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wyyshangyiqu101"></use>
        </svg>
        <!-- 播放按钮 -->
        <svg class="icon bofang" aria-hidden="true" @click="play" v-if="isPlaying">
          <use xlink:href="#icon-wyybofang"></use>
        </svg>
        <!-- 暂停按钮 -->
        <svg class="icon bofang" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-wyyzanting"></use>
        </svg>

        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wyyxiayiqu101"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wyyzu"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
//按需导入跑马灯组件
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations } from 'vuex'

export default {
  setup(props) {},
  props: ['musicItem', 'play', 'isPlaying'],
  components: {
    Vue3Marquee
  },
  methods: {
    ...mapMutations(['updateDetailShow'])
  },
  mounted() {
    console.log(this.musicItem)
  }
}
</script>

<style lang="less" scoped>
.musicdetail-container {
  width: 100%;
  height: 100%;
  .bgimg {
    width: 100%;
    height: 100%;
    position: fixed;
    //背景虚化
    filter: blur(1rem);
    z-index: -999;
  }

  .top-nav {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;

    .top-left {
      width: 14%;
      .icon {
        width: 100%;
        height: 100%;
        padding: 0.26rem;
        fill: #fff;
      }
    }
    .top-mid {
      width: 72%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;

      .songname {
        font-weight: 700;
        color: #fff;
      }
      .singername {
        span {
          font-size: 0.2rem;
          color: #dee1e6;
          margin-top: 0.1rem;
          //文字不换行
          white-space: nowrap;
        }
      }
    }
    .top-right {
      width: 14%;
      .icon {
        width: 100%;
        height: 100%;
        padding: 0.26rem;
        fill: #fff;
      }
    }
  }

  .mid-content {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .cz {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      //磁针动画
      transform-origin: 0 0; //旋转的原点
      transform: rotate(-13deg); //旋转角度：-13°
      transition: all 2s;
    }
    .cd {
      width: 5rem;
      height: 5rem;
      position: absolute;
      bottom: 2.3rem;
      z-index: -1;
    }
    .cpic {
      width: 3.2rem;
      height: 3.2rem;
      position: absolute;
      bottom: 3.14rem;
      border-radius: 50%;
      z-index: -2;
    }
  }

  .footer-control {
    width: 100%;

    .footer-btns {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .icon {
        width: 0.55rem;
        height: 0.55rem;
        fill: #ff3a3a;
      }
    }

    .footer-play {
      width: 100%;
      height: 1.5rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      //贴合在底部
      position: absolute;
      bottom: 0;
      .icon {
        width: 0.5rem;
        height: 0.5rem;
        fill: #fff;
      }
      .bofang {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>
