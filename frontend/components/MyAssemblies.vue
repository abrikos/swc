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
      <template v-slot:item.name="{item}">

        <span v-if="showNameField !== item.id" @click="showNameField=item.id"><v-icon title="click me">mdi-gesture-tap</v-icon>{{item.name}}</span>
        <v-text-field
            v-model="item.name"
            flat dense outlined hide-details append-icon="mdi-check"
            @click:append="changeField('name', item); showNameField=null"
            autofocus
            v-if="showNameField===item.id"
            :ref="`nameField-${item.id}`"
        />
      </template>
      <template v-slot:item.count="{ item }">
        <v-text-field v-model="item.count" flat dense outlined hide-details type="number" append-icon="mdi-check" @click:append="changeField('count', item)"/>
      </template>
      <template v-slot:item.controls="{ item }">
        <v-btn @click="goToAssembly(item)" icon><v-icon>mdi-file-edit-outline</v-icon></v-btn>
        <v-btn @click="goToAssembly(item)" icon color="red" x-small><v-icon>mdi-close</v-icon></v-btn>
      </template>

    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "MyAssemblies",
  data(){
    return {
      showNameField: null,
      items:[],
      headers:[
        {text:'Название', value:'name', width: '300px'},
        {text:'PartNum', value:'chassis.partNumber'},
        {text:'Описание', value:'chassis.descShort'},
        {text:'Количество', value:'count', width: '140px'},
        {text:'Цена', value:'price'},
        {text:'', value:'controls'}
      ]
    }

  },
  created() {
    this.loadAssemblies()
  },
  methods:{
    async changeField(field, item){
      await this.$axios.$put(`/configurator/assembly/${item.id}/${field}`,item)
      await this.loadAssemblies()
    },
    goToAssembly(e){
      this.$router.push('/configurator/assembly/' + e.id)
    },
    async loadAssemblies(){
      this.items =await this.$axios.$get('/user/assemblies')
    }
  }
}
</script>

<style scoped>

</style>