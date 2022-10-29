<template>
  <div>
    <Tabs :items="tabs" :onClick="tabChanged"/>
    <div class="list" v-if="!isTabConfigurations">
      <div class="chassis" v-for="item of items" @click="createAssembly(item)">
        <img :src="`/${item.platform === 'JBOD' ? '4U': '2U'}.png`" />
        <small>{{item.partNumber}} <br/><small>{{item.descShort}}</small></small>
      </div>
    </div>
    <cabinet-assemblies v-if="isTabConfigurations"/>
  </div>
</template>

<script>
import MyAssemblies from "~/components/MyAssemblies";
import CabinetAssemblies from "~/pages/cabinet/assemblies";
export default {
  name: "configurator-start",
  components: {CabinetAssemblies, MyAssemblies},
  data(){
    return {
      tab:0,
      tabs:[
        {type:'G2'},
        {type:'G3'},
        {type:'G2R'},
        {type:'AMD'},
        {type:'JBOD'},
        {type:'Сборки'},
      ],
      items:[],

    }
  },
  created() {
    this.loadChassis(0)
  },
  computed: {
    isTabConfigurations(){
      return this.tabs[this.tab].type === 'Сборки'
    }
  },
  methods:{
    tabChanged(index){
      this.tab = index
      if(!this.isTabConfigurations){
        this.loadChassis(index)
      }

    },
    async loadChassis(index){
      this.items = await this.$axios.$get('/configurator/chassis/' + this.tabs[index].type)
    },
    createAssembly(e){
      this.$axios.$get('/assembly/create/chassis/'+ e.id)
          .then(res=>this.$router.push('/configurator/' + res.id))
    }
  }
}
</script>

<style scoped lang="sass">
.list
  display: flex
  flex-wrap: wrap
  .chassis
    margin: 2px
    padding: 5px
    border: 1px solid silver
    width: 250px
    text-align: center
    cursor: pointer
    img
      margin: auto
      display: block
      width: 80%
</style>