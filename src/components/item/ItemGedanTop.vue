<template>
  <div class="itemgedantop-container">
    <!-- 虚化背景 -->
    <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
    <div class="top-nav">
      <div class="top-left">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-wyyzuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>

      <div class="top-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wyysousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wyyliebiao2"></use>
        </svg>
      </div>
    </div>
    <div class="top-cont">
      <div class="cont-img">
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="cont-item">
        <h4>{{ playlist.name }}</h4>

        <div class="item-touxiang">
          <span>
            <img :src="playlist.creator.avatarUrl" alt="" />
          </span>
          <span>{{ playlist.creator.nickname }}</span>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wyyyoujiantou"></use>
            </svg>
          </span>
        </div>

        <div class="item-description">
          <p>&nbsp;&nbsp;{{ playlist.description }}</p>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wyyyoujiantou"></use>
            </svg>
          </span>
        </div>
      </div>
    </div>

    <div class="top-itemlist">
      <!-- 评论 -->
      <div class="item-box">
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wyyxiaoxi"></use>
          </svg>
        </span>
        <span>{{ changeCount(playlist.commentCount) }}</span>
      </div>
      <!-- 分享 -->
      <div class="item-box">
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wyyfenxiang"></use>
          </svg>
        </span>
        <span>{{ changeCount(playlist.shareCount) }}</span>
      </div>
      <!-- 下载 -->
      <div class="item-box">
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wyyxiazai"></use>
          </svg>
        </span>
        <span>下载</span>
      </div>
      <!-- 多选 -->
      <div class="item-box">
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wyyduoxuanxuanzhong_o"></use>
          </svg>
        </span>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    //通过props传值，先判断若数据未拿到的情况，就需要在sessionStorage中获取数据
    if ((props.playlist.creator = '')) {
      props.playlist.creator = JSON.parse(sessionStorage.getItem().playlist).creator
    }
    //处理数据
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      } else {
        return num
      }
    }

    return { changeCount }
  },
  props: ['playlist']
}
</script>

<style lang="less" scoped>
.itemgedantop-container {
  width: 100%;
  height: 7.5rem;

  .bgimg {
    width: 100%;
    position: fixed;
    z-index: -1;
    // 虚化
    filter: blur(0.4rem);
  }

  .top-nav {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top-left,
    .top-right {
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 0.2rem;

      span {
        font-size: 0.4rem;
        color: #fff;
      }
      .icon {
        fill: #fff;
      }
    }
  }

  .top-cont {
    width: 100%;
    height: 3.6rem;
    display: flex;
    justify-content: space-between;
    .cont-img {
      margin: 0.6rem 0.2rem 0.2rem 0.2rem;
      width: 40%;
      img {
        width: 100%;
        border-radius: 0.2rem;
      }
    }
    .cont-item {
      margin: 0.6rem 0.2rem 0.2rem 0;
      width: 60%;
      h4 {
        color: #fff;
      }
      .item-touxiang {
        margin-top: 0.3rem;
        span {
          img {
            width: 0.72rem;
            height: 0.72rem;
            border-radius: 0.36rem;
          }
          color: #fff;
          vertical-align: middle;
          padding: 0 0.16rem;
          .icon {
            width: 0.36rem;
            height: 0.36rem;
            vertical-align: middle;
            fill: #fff;
          }
        }
      }
      .item-description {
        margin-top: 0.2rem;
        display: flex;
        justify-content: space-between;
        height: 0.7rem;
        p {
          width: 90%;
          height: 100%;
          color: #c6bab9;
          font-size: 0.26rem;
          //多行文本多余的字变成...，单行文本只要前面两行
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        span {
          width: 10%;
          height: 100%;
          line-height: 0.7rem;
          .icon {
            width: 0.36rem;
            height: 0.36rem;
            vertical-align: middle;
            fill: #fff;
            margin-left: 0.1rem;
          }
        }
      }
    }
  }
  .top-itemlist {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    margin-top: 0.4rem;

    .item-box {
      display: flex;
      flex-direction: column;

      span {
        .icon {
          width: 0.72rem;
          height: 0.72rem;
          fill: #fff;
        }
        font-size: 0.3rem;
        text-align: center;
        color: #fff;
      }
    }
  }
}
</style>
