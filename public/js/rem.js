//rem自动配适
function remSize() {
  //获取设备宽度
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth
  //最大宽度
  if (deviceWidth >= 750) {
    deviceWidth = 750
  }
  //最小宽度
  if (deviceWidth <= 320) {
    deviceWidth = 320
  }
  //配适rem(html字体大小) 750px->1rem=100px 75px->1rem=50px
  document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
  //设置body字体大小
  document.querySelector('body').style.fontSize = 0.3 + 'rem'
}

//初始化rem
remSize()

window.onresize = function () {
  //每当屏幕尺寸变化时，触发remSize
  remSize()
}


