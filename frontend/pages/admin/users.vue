<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="15"
        class="row-pointer"
        style="cursor: pointer"
    >
      <template v-slot:no-data>
        Ни чего не найдено
      </template>
      <template v-slot:item.description="{ item }">
        {{ item.component.description }}
      </template>
      <template v-slot:item.controls="{item}">
        <v-btn class="mx-2" small :color="item.isAdmin ? 'red' : 'silver' " @click="switchRole(item)">
          {{ item.isAdmin ? 'Revoke admin' : 'Make admin' }}
        </v-btn>
        <v-btn class="mx-2" small :color="item.blocked ? 'warning' : 'silver' " @click="block(item)">
          {{ item.blocked ? 'Заблокирован' : 'Блокировать' }}
        </v-btn>
        <v-btn class="mx-2" small @click="deleteUser(item)">
          Удалить
        </v-btn>
      </template>
      <template v-slot:header="props">
        <tr>
          <td>
            <v-text-field
                hide-details
                label="Фильтр описания"
                outlined flat dense class="table-filter"
                v-model="filter"
            />
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      filter:'',
      usersFound: [],
      headers: [
        {text: 'e-mail', value: 'email'},
        {text: 'Зарегистрирован', value: 'date'},
        {text: 'Вход', value: 'loggedDate'},
        {text: '', value: 'controls'},
      ]
    }
  },
  computed:{
    users(){
      return this.usersFound.filter(u=>u.email ? u.email.match(this.filter) : true)
    }
  },
  created() {
    this.reloadList()
  },
  methods: {
    async reloadList() {
      this.usersFound = await this.$axios.$get('/admin/users')

    },
    handleClick(e) {
      console.log(e)
    },
    switchRole(user) {
      this.$axios.$post('/admin/switch-role', user)
          .then(this.reloadList)
    },
    block(user) {
      this.$axios.$get(`/admin/user/${user.id}/block`)
          .then(this.reloadList)
    },
    deleteUser(user) {
      if(!confirm(`Удалить пользователя ${user.email}`)) return
      this.$axios.$get(`/admin/user/${user.id}/delete`)
          .then(this.reloadList)
    }
  }
}
</script>

<style scoped>

</style>