<template>
  <div>
    <v-card-title>Сборки</v-card-title>
    <v-card-text>
      <MyAssemblies @specReload="specReload"/>
    </v-card-text>
    <v-card-title>Спецификации</v-card-title>
    <v-card-text>
      <MySpecs ref="mySpecs"/>
    </v-card-text>
  </div>
</template>

<script>
import MyAssemblies from "~/components/MyAssemblies";
import MySpecs from "~/components/MySpecs";

export default {
  name: "cabinet-assemblies",
  components: {MySpecs, MyAssemblies},
  methods: {
    specReload() {
      this.$refs.mySpecs.loadSpecs()
    }
  }
}
</script>

<style scoped>

</style>