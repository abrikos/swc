<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="15"
        style="cursor: pointer"
    >
      <template v-slot:no-data>
        Ни чего не найдено
      </template>
      <template v-slot:item.toSpec="{item}">
        <v-checkbox dense hide-details/>
      </template>
      <template v-slot:item.name="{item}">

        <span v-if="showNameField !== item.id" @click="showNameField=item.id"><v-icon
            title="click me">mdi-gesture-tap</v-icon>{{ item.name }}</span>
        <v-text-field
            v-model="item.name"
            flat dense outlined hide-details append-icon="mdi-check"
            @click:append="changeField('name', item); showNameField=null"
            @blur="showNameField=null"
            autofocus
            v-if="showNameField===item.id"
            :ref="`nameField-${item.id}`"
        />
      </template>
      <template v-slot:item.count="{ item }">
        <v-text-field
            v-model="item.count" flat dense hide-details type="number"
            :append-icon="countEdited === item.id ? 'mdi-check' : ''"
            @change="countEdited=item.id"
            @mousedown="countEdited=item.id"
            @keyup.esc="$refs['count'+item.id].blur()"
            @blur="countEdited=false"
            :ref="'count'+item.id"
            @click:append="changeField('count', item); countEdited = false"
        />
      </template>
      <template v-slot:item.controls="{ item }">
        <v-btn @click="goToAssembly(item)" icon title="Редактировать">
          <v-icon>mdi-file-edit-outline</v-icon>
        </v-btn>
        <DialogAddToSpec :assembly="item" />
        <v-btn @click="deleteAssembly(item)" icon color="red" x-small title="Удалить">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>

    </v-data-table>
  </div>
</template>

<script>
import DialogAddToSpec from "~/components/DialogAddToSpec";
export default {
  name: "MyAssemblies",
  components: {DialogAddToSpec},
  data() {
    return {
      showNameField: null,
      countEdited: false,
      items: [],
      headers: [
        //{text: '', value: 'toSpec', width: '30px', sortable: false},
        {text: 'Название', value: 'name', width: '300px'},
        {text: 'PartNum', value: 'chassis.partNumber'},
        {text: 'Описание', value: 'chassis.descShort'},
        {text: 'Количество', value: 'count', width: '100px'},
        {text: 'Цена', value: 'price'},
        {text: '', value: 'controls'}
      ]
    }

  },
  created() {
    this.loadAssemblies()
  },
  methods: {
    async deleteAssembly(item){
      if(window.confirm(`Удалить сборку "${item.name}"?`)){
        await this.$axios.$delete(`/assembly/${item.id}`)
        await this.loadAssemblies()
      }
    },
    async changeField(field, item) {
      await this.$axios.$put(`/assembly/${item.id}/field/${field}`, item)
      await this.loadAssemblies()
    },
    goToAssembly(e) {
      this.$router.push('/configurator/assembly/' + e.id)
    },
    async loadAssemblies() {
      this.items = await this.$axios.$get('/assemblies/my')
    }
  }
}
</script>

<style scoped lang="sass">
.v-data-table
  ::v-deep .text-start
    padding: 0
  ::v-deep .v-input
    margin: 0
</style>