<template>
  <div style="width: 80%">
    <span v-if="!edited" @click="edited=true">
      <slot/>
      <v-btn icon v-if="!edited" @click="edited=true">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </span>
    <v-text-field
        autofocus
        v-if="edited"
        v-model="conf.name"
        outlined
        :append-icon="changed? 'mdi-check' : 'mdi-cancel'"
        @keyup="changed = true"
        @click:append="renameConf"
        @keyup.enter="renameConf"
        hide-details
    />
  </div>
</template>

<script>
export default {
  name: "ConfNameEdit",
  props:['conf'],
  data(){
    return {
      edited: false,
      changed: false
    }
  },
  methods:{
    async renameConf() {
      if(!this.changed) return this.edited = false
      await this.$axios.$put(`/configuration/${this.conf.id}/field/name`, this.conf)
      this.changed = false
      this.edited = false
    },
  }
}
</script>

<style scoped>

</style>