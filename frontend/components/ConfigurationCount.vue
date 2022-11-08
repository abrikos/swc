<template>
  <v-text-field
      v-model="item.count" flat dense hide-details type="number"
      :append-icon="countEdited === item.id ? 'mdi-check' : ''"
      :outlined="countEdited === item.id"
      @change="countEdited=item.id"
      @keyup="countEdited=item.id"
      @mousedown="countEdited=item.id"
      @keyup.esc="$refs['count'+item.id].blur()"
      @keyup.enter="changeField('count', item); countEdited = false"
      @blur="countEdited=false"
      :ref="'count'+item.id"
      @click:append="changeField('count', item); countEdited = false"
  />
</template>

<script>
export default {
  name: "ConfigurationCount",
  props:['item', 'onChange'],
  data(){
    return {
      countEdited: false
    }
  },
  methods:{
    async changeField(field, item) {
      await this.$axios.$put(`/configuration/${item.id}/field/${field}`, item)
      this.onChange()
      //await this.loadAssemblies()
      //await this.specReload()
    },
  }
}
</script>

<style scoped lang="sass">
.v-text-field
  :deep(.text-start)
    padding: 0
  :deep(.v-input)
    margin: 0
    ::-webkit-inner-spin-button
      display: none

</style>