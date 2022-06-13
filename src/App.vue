<template>
  <router-view></router-view>
  <FooterMusic></FooterMusic>
</template>

<script>
import FooterMusic from './components/item/FooterMusic.vue'
export default {
  setup() {},
  components: {
    FooterMusic
  }
}
</script>

<style lang="less">
//全局样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: black;
}

/* 全局图标大小 */
.icon {
  width: 0.5rem;
  height: 0.5rem;
}
</style>
