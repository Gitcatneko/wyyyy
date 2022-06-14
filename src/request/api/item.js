import service from "..";

//获取歌单详情页
export function getMusicGedan(gedanId) {
  return service({
    method: 'GET',
    url: '/playlist/detail',
    params: {
      id: gedanId
    }
  })
}

//获取歌单所有歌曲
export function getItmeList(gedanId, lim) {
  return service({
    method: 'GET',
    url: '/playlist/track/all',
    params: {
      //歌单id
      id: gedanId,
      //限制获取歌曲的数量
      limit: lim,
      //默认为0
      offset: 0
    }

  })
}

//获取当前播放歌曲的歌词
export function getItemLyric(musicId) {
  return service({
    method: 'GET',
    url: '/lyric',
    params: {
      id: musicId
    }
  })
}