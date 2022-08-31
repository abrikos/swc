<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="list"
        :items-per-page="5"
        class="elevation-1"
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
  }
}
</script>

<style scoped>

</style>