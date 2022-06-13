import { createStore } from "vuex";

export default createStore({
  state: {
    //将播放列表存入仓库
    playList: [
      {
        // 歌曲信息
        al: {
          id: 99035308,
          name: "阿拉斯加海湾",
          pic: 109951165518862420,
          picUrl:
            "https://p2.music.126.net/CbWwREaA22LmAv1oOtJt2w==/109951165518862422.jpg",
          pic_str: "109951165518862422",
        },
        name: "阿拉斯加海湾",
        id: 1500569811,
        // 作者信息
        ar: [
          {
            name: "蓝心羽",
          },
        ],
      },
    ],
    //默认下标为0
    playListIndex: 0,
    //正在播放，显示暂停按钮
    isPlaying: true,
    //歌曲详情页显示
    detailShow: false,
  },
  getters: {},
  mutations: {
    //改变播放暂停按钮
    updateIsPlaying(state, value) {
      state.isPlaying = value;
    },
    //获取当前歌单所有歌曲
    updatePlayList(state, value) {
      state.playList = value;
      console.log(state.playList);
    },
    //改变播放的歌曲
    updatePlayListIndex(state, value) {
      state.playListIndex = value;
    },
    //改变歌曲详情页打开或关闭
    updateDetailShow(state) {
      state.detailShow = !state.detailShow;
    },
  },
  actions: {},
  modules: {},
});
