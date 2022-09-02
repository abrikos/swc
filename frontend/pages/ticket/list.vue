<template>
  <div>
    <v-data-table
        @click:row="handleClick"
        :headers="headers"
        :items="list"
        :items-per-page="5"
        class= "row-pointer"
        style="cursor: pointer"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      list: [],
      headers: [
        {text: 'ID', value: 'ticketid'},
        {text: this.$t('Department'), value: 'departmenttitle'},
        {text: this.$t('Subject'), value: 'subject'},
      ]
    }
  },
  created() {
    this.$axios.$get('/ticket/list')
        .then(list => {
          this.list = list;
        })
  },
  methods: {
    handleClick(item) {
      this.$router.push('/ticket/view/' + item.ticketid)
    },
  }
}
</script>

<style scoped lang="sass">

</style>