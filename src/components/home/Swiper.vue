<template>
  <div class="swiper-container">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import axios from 'axios'
import { getBanner } from '@/request/api/home.js'
import { reactive, onMounted } from 'vue'
export default {
  setup() {
    //使用reactive获取响应式轮播图图片资源
    const state = reactive({
      images: []
    })

    onMounted(async () => {
      //轮播图banner
      // axios.get('http://localhost:3000/banner?type=2').then(res => {
      //   state.images = res.data.banners
      //   console.log(state.images)
      // })
      let { data: res } = await getBanner()
      state.images = res.banners
      // console.log(state.images)
    })

    return { state }
  }
}
</script>

<style lang="less" scoped>
.van-swipe {
  width: 100%;
  height: 3rem;

  .van-swipe-item {
    padding: 0 0.2rem;
    width: 100%;
    height: 3rem;

    img {
      width: 100%;
      height: 3rem;
      border-radius: 0.2rem;
    }
  }
  /deep/ .van-swipe__indicator--active {
    // 轮播图原点颜色
    background-color: red;
  }
}
</style>
