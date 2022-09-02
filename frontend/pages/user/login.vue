<template>
  <v-card>
    <v-card-title>{{ $t('Login') }}</v-card-title>
    <v-card-text>
      <v-text-field
          outlined
          v-model="login.email"
          :label="$t('Email')"
          :rules="rules"
      />
      <v-text-field
          outlined
          v-model="login.password"
          :label="$t('Password')"
          :rules="rules"
      />

    </v-card-text>
    <v-card-actions>
      <v-btn @click="submit" class="my-4">{{ $t('Send') }}</v-btn>
      <v-spacer/>
      <v-btn @click="resetPassword" class="my-4">{{ $t('Reset password') }}</v-btn>
    </v-card-actions>
    <v-data-table
        dense
        :headers="headers"
        :items="list"
        item-key="userid"
        class="elevation-1"
        :search="search"
    >
      <template v-slot:item.swuseremails="{ item }">
        <u v-for="email of item.swuseremails.map(e=>e.email)" @click="handleClick(email)">{{ email }}<br/></u>
      </template>
      <template v-slot:body.prepend>
        <tr>
          <td>
            <v-text-field v-model="email" type="text" label="Email"></v-text-field>
          </td>
          <td>
            <v-text-field v-model="name" type="text" label="Имя юзера"></v-text-field>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

export default {
  name: "login",
  auth: false,
  data() {
    return {
      name: '',
      email: '',
      search: '',
      valid: false,
      rules: [
        value => !!value || this.$t('Required'),
        //value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      list: [],
      login: {
        email: 'antonov@hikom.ru',
        password: '1',
      }
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'email',
          value: 'swuseremails',
          filter: f => {
            return (f + '').toLowerCase().includes(this['email'].toLowerCase())
          }
        },
        {
          text: "User",
          align: "left",
          sortable: false,
          value: "fullname",
          filter: f => {
            return (f + '').toLowerCase().includes(this['name'].toLowerCase())
          }
        },
      ]
    },
    user() {
      return this.$store.getters.getLoggedUser
    }
  },
  created() {
    this.$axios.$get('/user/list')
        .then(list => {
          this.list = list
        })
    if (this.user) this.$router.push('/user/cabinet')
  },
  methods: {
    handleClick(email){
      this.login.email = email
    },
    async resetPassword() {
      this.$router.push('/user/reset-password')
    },
    async submit() {
      try {
        this.$store.dispatch('auth/login', this.login)
            .then(() => {
              this.$router.push(this.$loadRedirect())
            })
      } catch (error) {
        console.error(error)
      }

    }
  }
}
</script>

<style scoped lang="sass">
u
  cursor: pointer
</style>
