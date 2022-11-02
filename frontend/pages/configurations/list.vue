<template>
  <div>
    <v-card-title>Конфигурации</v-card-title>
    <v-card-text>
      <ConfigurationsList :specReload="specReload"/>
    </v-card-text>
    <v-card-title>Спецификации</v-card-title>
    <v-card-text>
      <SpecsList ref="mySpecs"/>
    </v-card-text>
  </div>
</template>

<script>
import ConfigurationsList from "~/components/ConfigurationsList";
import SpecsList from "~/components/SpecsList";

export default {
  name: "cabinet-configurations",
  components: {SpecsList, ConfigurationsList},
  methods: {
    specReload() {
      this.$refs.mySpecs.loadSpecs()
    }
  }
}
</script>

<style scoped>

</style>