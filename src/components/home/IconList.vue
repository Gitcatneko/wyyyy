<template>
  <div class="iconlist-container">
    <div class="iconitem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-wyytuijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>

    <div class="iconitem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-wyyzhibo"></use>
      </svg>
      <span>私人FM</span>
    </div>

    <div class="iconitem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-wyygedan"></use>
      </svg>
      <span>歌单</span>
    </div>

    <div class="iconitem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-wyypaihangbang"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.iconlist-container {
  width: 100%;
  height: 2rem;
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .iconitem {
    width: 25%;
    height: 100%;
    display: flex;
    //主轴改为垂直
    flex-direction: column;
    align-items: center;

    .icon {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
