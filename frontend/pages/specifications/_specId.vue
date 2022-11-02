<template>
  <div v-if="spec">
    <h1>{{spec.name}}</h1>
    <div v-for="config of spec.configurations" :key="config.id">
      <strong>{{config.name}}</strong>
      <i>{{config.chassis.descFull}}</i>
      {{config}}
    </div>
  </div>
</template>

<script>
export default {
  name: "_spec-view",
  data(){
    return {
      spec: null,
    }
  },
  computed:{
    id() {
      return this.$route.params.specId;
    },
  },
  created() {
    this.loadSpec()
  },
  methods:{
    async loadSpec(){
      this.spec = await this.$axios.$get('/spec/' + this.id)
    }
  }
}
</script>

<style scoped>

</style>