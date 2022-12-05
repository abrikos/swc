<template>
  <div>
    <div class="tabs-small">
      <v-select :items="items" item-text="category" v-model="tab" @change="tabClick" return-object/>
      <v-select v-if="tab.children" :items="tab.children" item-text="type" v-model="subTab" @change="subTabClick" return-object/>
    </div>
    <div class="tabs-large">
      <div class="tabs">
        <div v-for="(item, i) of items" :key="i" @click="tabClick(item)"
             :class="'tab' + (tab.category===item.category ? ' active' : '') + (isHovering.category===item.category ? ' hovered':'')"
             @mouseover="isHovering = item.category"
             @mouseout="isHovering = false">
          <img :src="`/icons/${item.category}_icon.png`" v-if="withIcons"/>
          {{ item.category }}
        </div>
      </div>
      <div class="sub-tab">
        <div v-for="(item, i) of tab.children" :key="i" @click="subTabClick(item)"
             :class="item.type === subTab?.type? 'active':''">{{ item.type }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: ['onChange', 'items', 'withIcons'],
  data() {
    return {
      tab: this.items[0],
      subTab: this.items[0] && this.items[0].children && this.items[0].children[0],
      isHovering: false
    }
  },
  methods: {
    resetTab() {
      this.tab = 0
    },
    tabClick(tab) {
      this.tab = tab
      if (tab.children) {
        this.subTab = tab.children[0]
        this.onChange(tab.children[0])
      } else {
        this.onChange(tab)
      }

    },
    subTabClick(tab) {
      this.subTab = tab
      this.onChange(tab)
    }
  }
}
</script>

<style scoped lang="sass">
.tabs-small
  display: none
  @media (max-width: 1263px)
    display: block

.tabs-large
  @media (max-width: 1263px)
    display: none

.tabs
  overflow-y: auto
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
    margin: 0 10px
    border-width: 1px 1px 0 1px
    //border-style: solid
    border-color: silver
    color: black
    background-color: #ccc

    img
      margin: auto
      display: block
      width: 55px
      @media (max-width: 1263px)
        width: 30px

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

.sub-tab
  display: flex
  justify-content: center

  div
    margin: 10px
    cursor: pointer

  .active
    font-weight: bold
    color: #aa2238
    border-bottom: 1px solid #aa2238

</style>