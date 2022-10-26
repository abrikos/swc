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
        {text: 'Название', value: 'name'},
        {text: 'Кол-во', value: 'count'},
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
      console.log('my-specs load specs')
      this.specs = await this.$axios.$get('/specs')
    }
  }
}
</script>

<style scoped>

</style>