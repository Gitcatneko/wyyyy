<template>
  <div class="musiclist-container">
    <div class="musictop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>

    <div class="gedan">
      <van-swipe :loop="false" :show-indicators="false" :width="150" class="gedan-swipe">
        <van-swipe-item v-for="item in state.musicList" :key="item.id" class="gedan-item">
          <router-link :to="{ path: '/gedanitem', query: { id: item.id } }">
            <img :src="item.picUrl" alt="" />
            <span class="play-count">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-wyyplayfill"></use>
              </svg>
              <span>{{ changeCount(item.playCount) }}</span>
            </span>
            <span class="gedan-name"> {{ item.name }} </span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed } from 'vue'
import { getMusicList } from '@/request/api/home.js'
import router from '@/router'

export default {
  setup() {
    const state = reactive({
      musicList: []
    })

    /* const playNum = computed({
      get: () => {
        //浏览器得到值时触发，不能拿到值
      },
      set: () => {
        //设置值时触发
      }
    }) */

    //处理播放量数据
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      } else {
        return num
      }
    }

    //编程式路由导航
    /* function gotoGedan() {
      router.push(
        {
          name:'gedanitem',
          params:{
            id:
          }
        }
      )
    } */

    //axios请求
    onMounted(async () => {
      let { data: res } = await getMusicList()
      // console.log(res.result)
      state.musicList = res.result
      console.log(state.musicList)
    })
    return { state, changeCount }
  }
}
</script>

<style lang="less" scoped>
.musiclist-container {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;

  .musictop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;

    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }

  .gedan {
    width: 100%;
    height: 4rem;
    .gedan-swipe {
      height: 100%;
      .gedan-item {
        position: relative;
        padding: 0 5px;

        img {
          width: 100%;
          height: 2.7rem;
          border-radius: 0.2rem;
        }

        .play-count {
          width: 2rem;
          height: 0.6rem;
          position: absolute;
          margin-left: -1.7rem;
          margin-top: 0.1rem;
          z-index: 999;
          .icon {
            width: 0.42rem;
            height: 0.42rem;
          }
          span {
            color: #fff;
            vertical-align: top;
          }
        }
      }
    }
  }
}
</style>
