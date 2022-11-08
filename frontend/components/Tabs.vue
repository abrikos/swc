<template>
  <div class="tabs">
    <div v-for="({type}, i) of items" :key="i" @click="tabClick(i)"
         :class="'tab' + (tab===i ? ' active' : '') + (isHovering===i ? ' hovered':'')"
         @mouseover="isHovering = i"
         @mouseout="isHovering = false">
      <img :src="`/icons/${type}_icon.png`" v-if="withIcons" :class="imageStyle"/>
      {{ type }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: ['onClick', 'items', 'withIcons'],
  computed:{
    imageStyle(){
      return this.$vuetify.theme.isDark ? 'inverse' : ''
    }
  },
  data(){

    return {
      tab: 0,
      isHovering : false
    }
  },
  methods:{
    resetTab(){
      this.tab = 0
    },
    tabClick(index){
      this.tab = index
      this.onClick(index)
    }
  }
}
</script>

<style scoped lang="sass">
.tabs
  display: flex
  cursor: pointer
  text-align: center
  border-bottom: 1px solid silver
  padding-bottom: 5px
  font-size: .9em

  div
    margin: 1px
    border-radius: 12px 12px 0 0

  .tab
    width: 120px
    text-align: center
    padding: 10px
    margin: 0 20px
    border-width: 1px 1px 0 1px
    //border-style: solid
    border-color: silver
    color: black
    background-color: #ccc
    img
      margin: auto
      display: block
      width: 55px
  .tab.hovered
    background-color: silver

  .tab.active
    background-color: #aa2238
    border-color: silver
    border-style: solid
    border-width: 1px 1px 0 1px
    color: white
    font-weight: bold
    img
      filter: invert(1)

</style>