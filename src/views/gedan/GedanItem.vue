<template>
  <div class="gedanitem-container">
    <ItemGedanTop :playlist="state.playlist"></ItemGedanTop>
    <ItemMusicList :songlist="state.songlist" :subscribedCount="state.playlist.subscribedCount"></ItemMusicList>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive, onMounted } from 'vue'
import { getMusicGedan, getItmeList } from '@/request/api/item.js'

import ItemGedanTop from '@/components/item/ItemGedanTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue'
export default {
  setup() {
    const state = reactive({
      playlist: {},
      songlist: []
    })

    onMounted(async () => {
      let id = useRoute().query.id

      //获取歌单详情
      let { data: gedan } = await getMusicGedan(id)
      state.playlist = gedan.playlist
      // console.log(state.playlist)

      //获取歌单歌曲列表，参数(歌曲id, 限制显示歌曲个数不填则显示所有歌)
      let { data: everyitem } = await getItmeList(id)
      state.songlist = everyitem.songs
      // console.log(state.songlist)

      //防止页面刷新，数据丢失，将数据保存到sessionStorage或localStorage中
      //要保存playlist这个对象，要先转换成json
      //这里直接将整个state保存进sessionStorage中
      sessionStorage.setItem('itemDetail', JSON.stringify(state))
    })

    return { state }
  },
  components: {
    ItemGedanTop,
    ItemMusicList
  }
}
</script>

<style></style>
