<template>
  <div>
    <Tabs :items="tabs" :onChange="tabChanged"/>
    <ChassisList :platform="tab" :onClick="createConfiguration"/>
  </div>
</template>

<script>

import ChassisList from "~/components/ChassisList";
export default {
  name: "configurator-start",
  components: {ChassisList},
  data() {
    const tabs = [
      {category: 'G2', title:'Intel Gen2'},
      {category: 'G3', title:'Intel Gen3'},
      {category: 'G2R', title:'Intel реестр'},
      {category: 'AMD'},
      {category: 'JBOD'},
    ]
    return {
      tab: tabs[0],
      tabs,
      items: [],

    }
  },
  methods: {
    tabChanged(tab) {
      this.tab = tab
    },
    createConfiguration(e) {
      this.$axios.$get('/configuration/create/chassis/' + e.id)
          .then(res => {
            this.$router.push('/configurations/' + res.id)
          })
    }
  }
}
</script>

<style scoped lang="sass">
</style>