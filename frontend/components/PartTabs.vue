<template>
  <div  class="tabs">
    <div v-for="tab of tabs" :key="tab.icon">
        <div :class="`tab-icon-${tab.icon} ${isHovering===tab.icon ? 'hovered':''} tab`" @mouseover="isHovering = tab.icon" @mouseout="isHovering = false" ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PartTabs",
  data(){
    return {
      isHovering: false,
      tabs:[
        {icon:'base'},
        {icon:'processors'},
        {icon:'memory'},
        {icon:'storage'},
        {icon:'os___software'},
        {icon:'pci'},
        {icon:'optical_drive'},
        {icon:'power'},
        {icon:'others'},
        {icon:'security'},
        {icon:'services'},
        {icon:'unconfigured'},
      ]
    }
  }
}
</script>

<style scoped lang="sass">
.tabs
  display: flex
  border: 1px solid green
  border-radius: 10px
  .tab
    background-size: cover
    width: 70px
    height: 70px
  .tab.hovered
      opacity: .2
</style>
