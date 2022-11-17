<template>
  <div>
    <Tabs :items="tabs" :onChange="tabChanged"/>
    <div class="list">
      <div class="chassis" v-for="item of items" @click="createConfiguration(item)">
        <img :src="`/upload/${item.partNumber}.jpg`" />
        <strong>{{item.partNumber}} </strong>
        <br/>
        <small>{{item.params}}</small>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "configurator-start",
  data(){
    return {
      tab:0,
      tabs:[
        {category:'G2'},
        {category:'G3'},
        {category:'G2R'},
        {category:'AMD'},
        {category:'JBOD'},
      ],
      items:[],

    }
  },
  created() {
    this.loadChassis(this.tabs[0])
  },
  methods:{
    tabChanged(tab){
      console.log(tab)
      this.tab = tab
      if(!this.isTabConfigurations){
        this.loadChassis(tab)
      }

    },
    async loadChassis(tab){
      this.items = await this.$axios.$get('/configurator/chassis/' + tab.category)
    },
    createConfiguration(e){
      this.$axios.$get('/configuration/create/chassis/'+ e.id)
          .then(res=> {
            this.$router.push('/configurations/' + res.id)
          })
    }
  }
}
</script>

<style scoped lang="sass">
.list
  display: flex
  flex-wrap: wrap
  .chassis
    margin: 12px
    padding: 5px
    border: 1px solid silver
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2)
    width: 250px
    text-align: center
    cursor: pointer
    img
      margin: auto
      display: block
      width: 80%
</style>