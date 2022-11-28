<template>
  <div>
    <slot/>
    <span v-if="!edited" @click="edited=true">

      <v-btn icon v-if="!edited" @click="edited=true">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </span>
    <v-text-field
        autofocus
        v-if="edited"
        v-model="spec.name"
        outlined
        :append-icon="changed? 'mdi-check' : 'mdi-cancel'"
        @keyup="changed = true"
        @click:append="renameSpec"
        @keyup.enter="renameSpec"
        hide-details
    />
  </div>
</template>

<script>
export default {
  name: "SpecNameEdit",
  props: ['spec'],
  data() {
    return {
      edited: false,
      changed: false
    }
  },
  methods: {
    async renameSpec() {
      if (!this.changed) return this.edited = false
      await this.$axios.$put(`/spec/${this.spec.id}/rename`, this.spec)
      this.changed = false
      this.edited = false
    },
  }
}
</script>

<style scoped>

</style>