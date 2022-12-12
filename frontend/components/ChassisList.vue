<template>
  <div class="list">
    <div class="chassis" v-for="item of chassis" @click="click(item)">
      <img :src="`/upload/${item.partNumber}.jpg`"/>
      <strong>{{ item.partNumber.replace(/_/g, ' ') }} </strong>
      <br/>
      <small>{{ item.params }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChassisList",
  props:['platform','onClick'],
  data(){
    return {
      items: [],
    }
  },
  created(){
    this.loadChassis()
  },
  computed: {
    chassis() {
      return this.items.filter(c => c.platform === this.platform)
    }
  },
  methods:{
    click(item){
      this.onClick(item)
    },
    async loadChassis() {
      this.items = await this.$axios.$get('/configuration/chassis')
    },
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