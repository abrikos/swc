<template>
  <div>
    <h1>Конфигуратор <small>Выберите шасси</small></h1>
    <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="15"
        class="row-pointer"
        style="cursor: pointer"
        @click:row="createAssembly"
    >
      <template v-slot:no-data>
        Ни чего не найдено
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "configurator-start",
  data(){
    return {
      items:[],
      headers:[
        {text:'Название', value: 'description'},
      ]
    }
  },
  created() {
    this.loadChassis()
  },
  methods:{
    async loadChassis(){
      this.items = await this.$axios.$get('/configurator/chassis')
    },
    createAssembly(e){
      this.$axios.$get('/configurator/create/assembly/'+ e.id)
          .then(res=>this.$router.push('/configurator/assembly/' + res.id))
    }
  }
}
</script>

<style scoped>

</style>