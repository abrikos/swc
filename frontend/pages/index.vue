<template>
  <v-card>
    <v-card-title>INDEX</v-card-title>
    <v-card-text>
      Для начала работы с конфигуратором необходимо  <router-link  to="/user/login">Войти</router-link> или <router-link  to="/user/signup">Зарегистрироваться</router-link>
    </v-card-text>
  </v-card>
</template>

<script>


export default {
  auth: false,
  computed: {
    user() {
      return this.$store.getters.getLoggedUser
    }
  },
  data() {
    return {
      form: {},
      list: [],
      departments: []
    }
  },

  methods: {

  },
  created() {
    if(this.$store.getters.getLoggedUser)
      this.$router.push(this.$store.getters.getLoginRedirect)
  }

}
</script>
