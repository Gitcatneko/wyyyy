<template>
  <div class="topnav-container">
    <div class="top-left">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-wyyliebiao"></use>
      </svg>
    </div>

    <div class="top-middle">
      <span>我的</span>
      <span>发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>

    <div class="top-right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-wyysousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.topnav-container {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .top-middle {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.36rem;
  }
}
</style>
