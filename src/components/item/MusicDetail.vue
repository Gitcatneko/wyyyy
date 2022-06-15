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
    <div class="mid-content" @click="letLyricShow" v-if="!isLyricShow">
      <!-- 黑胶外圈 -->
      <img src="@/assets/cdmusic.png" alt="" class="cd" />
      <!-- 磁针 -->
      <img src="@/assets/cizhen.png" alt="" class="cz" :class="{ cz_active: !isPlaying }" />
      <!-- 磁盘图片 -->
      <img :src="musicItem.al.picUrl" alt="" class="cpic" :class="{ cpic_active: !isPlaying, cpic_pause: isPlaying }" />
    </div>

    <!-- 中间歌词显示部分 -->
    <div class="mid-lyric-content" @click="letLyricShow" v-else>
      <p v-for="item in lyric" :key="item">{{ item.lrc }}</p>
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
import { mapMutations, mapState } from 'vuex'

export default {
  setup(props) {},
  props: ['musicItem', 'play', 'isPlaying'],
  data() {
    return {
      isLyricShow: false
    }
  },
  components: {
    Vue3Marquee
  },
  methods: {
    ...mapMutations(['updateDetailShow']),
    //黑胶碟片和歌词切换显示
    letLyricShow() {
      this.isLyricShow = !this.isLyricShow
    }
  },
  computed: {
    ...mapState(['musicLyric']),
    //对歌词原数据进行处理，歌词是string类型，需要
    lyric() {
      //最后需要返回处理好数据的数组arr
      let arr
      //问题：如果vuex中的歌词数据musicLyric没有获取到，而DOM却已经渲染完成，就会拿不到数据
      //解决：加个判断，等到数据拿到之后，再进行处理
      if (this.musicLyric) {
        //使用正则切割数据，以换行切割
        arr = this.musicLyric.lrc.lyric.split(/[(\r\n)\r\n]+/).map((item, index) => {
          let min = item.slice(1, 3) //分
          let sec = item.slice(4, 6) //秒
          let mill = item.slice(7, 10) //毫秒
          let lrc = item.slice(11, item.length) //歌词主体
          // console.log(min, sec, mill, lrc)
          // 毫秒有时三位数有事两位数，两位数时切割带有]符号，判断NaN，需要再加判断
          if (isNaN(Number(mill))) {
            //如果毫秒是两位数的时候，重新切割
            mill = item.slice(7, 9)
            //后面的歌词主体也重新切割
            lrc = item.slice(10, item.length)
          }
          //当前歌曲进度时长转换为数字类型，并以毫秒显示
          let time = parseInt(min * 60 * 1000 + sec * 1000 + mill)
          //最后用对象形式将数据包起来丢到arr数组中去
          return { min, sec, mill, lrc, time } //键和值相同，简写形式
        })
      }
      return arr
    }
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

  // 黑胶磁盘部分
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

  //中间歌词显示部分
  .mid-lyric-content {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.2rem;
    //溢出滚动条
    overflow: scroll;

    p {
      color: #ceedff;
      margin-bottom: 0.3rem;
      font-size: 0.32rem;
      text-align: center;
    }
  }

  // 底部控制区域
  .footer-control {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
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
    //进度条
    .footer-progressbar {
      width: 100%;
    }

    .footer-play {
      width: 100%;
      height: 1.5rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
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
