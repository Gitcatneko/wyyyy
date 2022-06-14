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
          <span v-for="singer in musicItem.ar" :key="singer.id"
            >/{{ singer.name }}
          </span>
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
      <!-- 黑胶外圈 -->
      <img src="@/assets/cdmusic.png" alt="" class="cd" />
      <!-- 磁针 -->
      <img
        src="@/assets/cizhen.png"
        alt=""
        class="cz"
        :class="{ cz_active: !isPlaying }"
      />
      <!-- 磁盘图片 -->
      <img
        :src="musicItem.al.picUrl"
        alt=""
        class="cpic"
        :class="{ cpic_active: !isPlaying, cpic_pause: isPlaying }"
      />
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
        <svg
          class="icon bofang"
          aria-hidden="true"
          @click="play"
          v-if="isPlaying"
        >
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
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations } from "vuex";

export default {
  setup(props) {},
  props: ["musicItem", "play", "isPlaying"],
  components: {
    Vue3Marquee,
  },
  methods: {
    ...mapMutations(["updateDetailShow"]),
  },
  mounted() {
    console.log(this.musicItem);
  },
};
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
    .cz_active {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      //旋转后的磁针动画
      transform-origin: 0 0; //旋转的原点
      transform: rotate(0deg); //由-13°旋转到0°
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
      //将动画添加至该类中，参数为该动画类名 动画周期 匀速 无限循环
      animation: rotate_cpic 10s linear infinite;
    }
    //磁盘图片旋转动画
    @keyframes rotate_cpic {
      0% {
        //从0°开始转
        transform: rotateZ(0deg);
      }
      100% {
        //转满一圈
        transform: rotateZ(360deg);
      }
    }
    //控制动画是否启动
    .cpic_active {
      animation-play-state: running;
    }
    //控制动画是否暂停
    .cpic_pause {
      animation-play-state: paused;
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
