<template>
  <v-container>
    <v-card>
      <span class="red--text">Контролируемый доступ. В режиме тестирования</span>
      <v-card-title>Вход</v-card-title>
      <v-card-text>
        <v-text-field
            outlined
            v-model="login.email"
            :label="$t('Email')"
            :rules="rules"
        />
        <v-text-field
            outlined
            type="password"
            v-model="login.password"
            label="Пароль"
            :rules="rules"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submit" class="my-4">Вход</v-btn>
        <v-spacer/>
        <v-btn to="/user/reset-password" class="my-4">Сбросить пароль</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: "login",
  auth: false,
  data() {
    const login = window?.location.host === 'test.abrikos.pro' ? {
      email: 'abrikoz@gmail.com',
      password: '123',
    } : {}
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
      login
    }
  },
  computed: {
    user() {
      return this.$store.getters.getLoggedUser
    }
  },
  created() {
    if (this.user) this.$router.push(this.$store.getters.getLoginRedirect)
  },
  methods: {
    async submit() {
      await this.$auth.login({data:this.login}).catch(e=>console.log('Login problem', e))
      if(this.$store.getters.getLoggedUser)
        await this.$router.push(this.$store.getters.getLoginRedirect)
    }
  }
}
</script>

<style scoped lang="sass">
.v-card
  width: 400px
  margin: auto
u
  cursor: pointer
</style>
