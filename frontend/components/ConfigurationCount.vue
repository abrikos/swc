<template>
  <span>
<!--    <v-text-field
        v-if="false"
        v-model="item.count"
        flat dense hide-details type="number"
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
    />-->
    <input
        v-model="item.count"
        @keyup.enter="changeField('count', item)"
        type="number"
        @keyup="changeField('count', item)"
        @change="changeField('count', item)"
        style="text-align: center"
    />
<!--    <v-btn v-if="countEdited" icon @click="changeField('count', item)"><v-icon>mdi-check</v-icon></v-btn>-->
  </span>
</template>

<script>
export default {
  name: "ConfigurationCount",
  props: ['item', 'onChange'],
  data() {
    return {
      countEdited: false
    }
  },
  methods: {
    keyUp(){
      console.log(this.item.count)
      if(this.item.count < 0) return this.item.count = 0
      if(this.item.count) this.item.count = Math.ceil(this.item.count)
      console.log(this.item.count)
      this.countEdited=true
    },
    async changeField(field, item) {
      await this.$axios.$put(`/configuration/${item.id}/field/${field}`, item)
      this.countEdited = false
      this.onChange()
      //await this.loadAssemblies()
      //await this.specReload()
    },
  }
}
</script>

<style scoped lang="sass">
input
  border: 1px solid silver
  padding: 2px
  width: 50px

</style>