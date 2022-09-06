<template>
  <div>
    <v-data-table
        @click:row="handleClick"
        :headers="headers"
        :items="list"
        :items-per-page="25"
        class= "row-pointer"
        style="cursor: pointer"
    >
      <template v-slot:item.swticketposts="{ item }">
        {{item.swticketposts.length}}
      </template>
      <template v-slot:item.dateline="{ item }">
        {{$fromUnixTimestamp(item.dateline)}}
      </template>
    </v-data-table>
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
        {text: this.$t('Date'), value: 'dateline'},
        {text: this.$t('Department'), value: 'swdepartment.title'},
        {text: this.$t('Subject'), value: 'subject'},
        {text: this.$t('Posts'), value: 'swticketposts'},
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