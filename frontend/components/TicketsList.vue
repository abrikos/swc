<template>
  <div>
    <v-data-table
        v-if="list"
        @click:row="handleClick"
        :headers="headers"
        :items="list"
        :items-per-page="15"
        class="row-pointer"
        style="cursor: pointer"
    >
      <template v-slot:no-data>
        Ни чего не найдено
      </template>
      <template v-slot:item.swticketposts="{ item }">
        {{ item.swticketposts.length }}
      </template>
      <template v-slot:item.dateline="{ item }">
        {{ $fromUnixTimestamp(item.dateline) }}
      </template>
    </v-data-table>
    <v-card class="d-flex justify-center mb-6" v-if="isSearching">
      <v-progress-circular
          class="pa-2"
          indeterminate
          color="primary"
      ></v-progress-circular>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "TicketsList",
  props: ['form'],
  data() {
    return {
      list: null,
      isSearching: false,
      headers: [
        {text: '#', value: 'ticketid'},
        {text: 'Дата', value: 'dateline', width: "110px"},
        {text: "Тема", value: 'subject'},
        {text: "Департ.", value: 'departmenttitle'},
        {text: 'Ответственный', value: 'ownerstaffname'},
        {text: 'Имя', value: 'fullname'},
        {text: 'email', value: 'email'},
        //{text: "Посты", value: 'swticketposts', width: 90},
      ]
    }
  },
  created() {
    if (!this.isSearch) return
    this.goToSearch()
  },
  methods: {
    async goToSearch() {
      this.isSearching = true
      this.list = await this.$axios.$post('/search', this.form);
      this.isSearching = false
    },
    handleClick(item) {
      this.$router.push('/ticket/view/' + item.ticketid)
    },
  },
  computed: {
    isSearch() {
      return Object.keys(this.form).length
    }
  }
}
</script>

<style scoped lang="sass">

</style>