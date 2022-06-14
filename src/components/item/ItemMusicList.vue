<template>
  <div class="itemmusiclist-container">
    <!-- 列表头部 -->
    <div class="list-top">
      <div class="list-top-left">
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wyybofang_o"></use>
          </svg>
        </span>
        <span>播放全部</span>
        <span>(共{{ songlist.length }}首)</span>
      </div>
      <div class="list-top-right">
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wyyjiahao_o"></use>
          </svg>
        </span>
        <span>收藏({{ subscribedCount }})</span>
      </div>
    </div>
    <!-- 列表内容 -->
    <div class="list-content">
      <div class="songitem" v-for="(item, index) in songlist" :key="item.id">
        <!-- 点击音乐列表的时候，将当前歌单歌曲列表更新至vuex -->
        <div class="itemleft" @click="playMusic(index)">
          <span>{{ index + 1 }}</span>
          <div class="songs">
            <!-- 歌名 -->
            <div class="songname">{{ item.name }}</div>
            <!-- 歌手 -->
            <span class="singername" v-for="singer in item.ar" :key="singer.id">/{{ singer.name }}</span>
          </div>
        </div>
        <div class="itemright">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wyyliebiao2"></use>
          </svg>
          <!-- 判断若该歌曲有mv,则显示mv图标 -->
          <svg class="icon" aria-hidden="true" v-if="item.mv != 0">
            <use xlink:href="#icon-wyyshipin"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  setup(props) {
    console.log(props)
    return {}
  },
  props: ['songlist', 'subscribedCount'],
  methods: {
    playMusic(index) {
      //点击音乐列表的时候，将当前歌单歌曲列表更新至vuex
      this.updatePlayList(this.songlist)
      //切换为当前所点击的歌曲
      this.updatePlayListIndex(index)
      //点击后，若正在播放则暂停，若正在暂停则继续播放
    },
    ...mapMutations(['updatePlayList', 'updatePlayListIndex'])
  }
}
</script>

<style lang="less" scoped>
.itemmusiclist-container {
  width: 100%;
  background-color: #fff;
  padding: 0 0.1rem 1.2rem 0.1rem;
  margin-top: -1rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;

  .list-top {
    display: flex;
    justify-content: space-between;

    .list-top-left {
      .icon {
        width: 0.76rem;
        height: 0.76rem;
      }
      span {
        vertical-align: middle;
        &:nth-child(2) {
          padding-left: 0.2rem;
        }
        &:last-child {
          color: #b9babd;
          font-size: 0.22rem;
        }
      }
    }
    .list-top-right {
      background-color: #ff1800;
      margin: 0.1rem;
      border-radius: 0.3rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        .icon {
          width: 0.36rem;
          height: 0.36rem;
          fill: #fff;
          vertical-align: middle;
        }
        //序号的span
        &:last-child {
          color: #fff;
          font-size: 0.3rem;
          vertical-align: middle;
        }
      }
    }
  }

  .list-content {
    width: 100%;
    .songitem {
      width: 100%;
      height: 1rem;
      display: flex;
      .itemleft {
        width: 70%;
        display: flex;
        span {
          &:first-child {
            width: 15%;
            text-align: center;
            line-height: 1rem;
            color: #9a968e;
          }
        }
        .songs {
          width: 85%;
          // 文字不换行
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .songname {
            margin-top: 0.14rem;
            font-weight: bold;
            height: 0.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .singername {
            color: #9fa5ac;
            font-size: 0.26rem;
            height: 0.3rem;
          }
        }
      }
      .itemright {
        width: 30%;
        .icon {
          float: right;
          width: 50%;
          height: 100%;
          padding: 0.24rem;
          fill: #959595;
        }
      }
    }
  }
}
</style>
