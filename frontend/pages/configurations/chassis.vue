<template>
  <div>
    <Tabs :items="tabs" :onChange="tabChanged"/>
    <ChassisList :platform="tab.category" :onClick="createConfiguration"/>
  </div>
</template>

<script>

import ChassisList from "~/components/ChassisList";
export default {
  name: "configurator-start",
  components: {ChassisList},
  data() {
    return {
      tab: {category: 'G2'},
      tabs: [
        {category: 'G2'},
        {category: 'G3'},
        {category: 'G2R'},
        {category: 'AMD'},
        {category: 'JBOD'},
      ],
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