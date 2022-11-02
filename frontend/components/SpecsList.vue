<template>
  <div>
    <v-data-table
        :items="specs"
        :headers="headers"
        :items-per-page="5"
        @click:row="item=>$router.push('/specifications/' + item.id)"
        style="cursor: pointer"
    >
      <template v-slot:no-data>
        Ни чего не найдено
      </template>
      <template v-slot:item.count="{item}">
        {{ item.configurations.length }}
      </template>
      <template v-slot:item.controls="{item}">
        <v-btn @click.stop.prevent @click="deleteSpec(item)" x-small icon color="red" title="Удалить">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>

export default {
  name: "SpecsList",
  data() {
    return {
      dialogSpec: null,
      newSpecEdited: false,
      newSpec: '',
      specs: [],
      headers: [
        {text:'Дата', value: 'date', width: '150px'},
        {text: 'Название', value: 'name'},
        {text: 'Сумма', value: 'price'},
        {text: 'Кол-во сборок', value: 'count', width: '150px', align: 'right'},
        {text: '', value: 'controls', sortable: false, width: '60px'}
      ],
    }
  },
  created() {
    this.loadSpecs()
  },
  methods: {
    dialogClose() {
      this.loadSpecs()
      this.dialogSpec = null
    },
    dialogShow(item) {
      this.dialogSpec = item
    },
    async loadSpecs() {
      this.specs = await this.$axios.$get('/specs')
    },
    async deleteSpec(item) {
      if (window.confirm(`Удалить спецификацию "${item.name}"?`)) {
        await this.$axios.$delete('/spec/' + item.id)
        await this.loadSpecs()
      }
    }
  }
}
</script>

<style scoped>

</style>