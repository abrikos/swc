<template>
  <div>
    <v-data-table
        :items="specs"
        :headers="headers"
        :items-per-page="5"
    >
      <template v-slot:no-data>
        Ни чего не найдено
      </template>
      <template v-slot:item.count="{item}">
        {{ item.assemblies.length }}
      </template>
      <template v-slot:item.controls="{item}">
        <v-btn @click="dialogShow(item)" icon title="Редактировать">
          <v-icon>mdi-file-edit-outline</v-icon>
        </v-btn>
        <v-btn @click="deleteSpec(item)" x-small icon color="red" title="Удалить">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <DialogEditSpec :spec="dialogSpec" v-if="dialogSpec" :dialogVisible="dialogSpec"
                    @close="dialogClose"/>
  </div>
</template>

<script>
import DialogEditSpec from "~/components/DialogEditSpec";

export default {
  name: "MySpecs",
  components: {DialogEditSpec},
  data() {
    return {
      dialogSpec: null,
      newSpecEdited: false,
      newSpec: '',
      specs: [],
      headers: [
        {text:'Дата', value: 'date', width: '150px'},
        {text: 'Название', value: 'name'},
        {text: 'Кол-во сборок', value: 'count', width: '100px'},
        {text: '', value: 'controls', sortable: false, width: '100px'}
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