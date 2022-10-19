<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-list dense>
          <v-text-field label="Поиск организации" v-model="search"/>
          <v-list-item-group
              v-model="selectedItem"
              color="primary"
          >
            <v-list-item

                v-for="(item, i) in orgs.filter(l=>search ? l.organizationname.match(search) : l)"
                @click="loadUsers(item)"
                :key="i"
            >
              <v-list-item-content>
                <v-list-item-title class="text-wrap" v-text="item.organizationname"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                {{item.swusers.length}}
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="3">
        {{searchUser}}
        <v-list dense>
          <v-text-field label="Поиск юзера в организации" v-model="searchUser" v-if="users.length"/>
          <v-list-item-group
              color="primary"
          >
            <v-list-item

                v-for="(item, i) in users.filter(l=>searchUser ? l.fullname.match(searchUser) : l)"
                @click="loadTickets(item)"
                :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.fullname"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col>
        <v-data-table
            @click:row="handleClick"
            :headers="headers"
            :items="tickets"
            :items-per-page="15"
            class="row-pointer"
            style="cursor: pointer"
        >
          <template v-slot:no-data>
            Ни чего не найдено
          </template>
          <template v-slot:item.dateline="{ item }">
            {{ $fromUnixTimestamp(item.dateline) }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "organisation",
  data() {
    return {
      selectedItem: null,
      search: null,
      searchUser: null,
      orgs: [],
      tickets: [],
      users: [],
      headers: [
        {text: '#', value: 'ticketid'},
        {text: 'Дата', value: 'dateline', width: "110px"},
        {text: "Тема", value: 'subject'},
        {text: 'Имя', value: 'fullname'},
        //{text: "Посты", value: 'swticketposts', width: 90},
      ]
    }
  },
  created() {
    this.$axios.$get('/organisation/list')
        .then(data => {
          this.orgs = data;
        })
  },
  methods: {
    handleClick(item){
      //this.$router.push('/ticket/view/' + item.ticketid)
      window.open('/ticket/view/' + item.ticketid, '_blank');
    },
    loadUsers(e) {
      this.users = e.swusers
      this.$axios.$get('/ticket/organisation/' + e.userorganizationid)
          .then(data => {
            this.tickets = data;
          })
    },
    loadTickets(e) {
      this.$axios.$get('/ticket/users/' + e.userid)
          .then(data => {
            this.tickets = data;
          })

    }
  }
}
</script>

<style scoped>

</style>