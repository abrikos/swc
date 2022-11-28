<template>
  <div>
    <h4>Сервисы</h4>
    <v-radio-group v-model="service" @change="setService">
    <v-radio
        v-for="s of configuration.chassis.services"
        :key="s.id"
        :label="s.name"
        :value="s.id"
    />
    </v-radio-group>
<!--    <v-btn v-if="service" @click="service=null; setService()" color="red">Удалить сервис</v-btn>-->
  </div>
</template>

<script>
export default {
  name: "ConfigurationServices",
  props:['configuration', 'reload'],
  data(){
    return {
      service: null
    }
  },
  created() {
    this.service = this.configuration.service?.id
  },
  methods: {
    async setService(){
      const {service} = this;
      await this.$axios.$put(`/configuration/${this.configuration.id}/field/service`, {service})
      await this.reload()
    }
  }
}
</script>

<style scoped>

</style>