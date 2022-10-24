<template>
  <div>
    <v-card-title>Сборки</v-card-title>
    <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="15"
        class="row-pointer"
        style="cursor: pointer"
        @click:row="goToAssembly"
    >
      <template v-slot:no-data>
        Ни чего не найдено
      </template>
      <template v-slot:item.description="{ item }">
        {{ item.component?.description }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "cabinet-assemblies",
  data(){
    return {
      items:[],
      headers:[
        {text:'Описание', value:'description'}
      ]
    }

  },
  created() {
    this.loadAssemblies()
  },
  methods:{
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