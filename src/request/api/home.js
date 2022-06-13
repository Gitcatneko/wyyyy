import service from "..";

//home首页发送的请求，获取首页轮播图
export function getBanner() {
  return service({
    method: 'GET',
    url: '/banner?type=2'
  })
}

//发现好歌单
export function getMusicList() {
  return service({
    method: 'GET',
    url: '/personalized?limit=10'
  })
}