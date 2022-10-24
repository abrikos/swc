<template>
  <v-app>
    <v-app-bar
        fixed
        app
    >
      <v-tabs>
        <v-tab to="/" >
          Начало
        </v-tab>
        <v-tab to="/configuration" >
          Конфигуратор
        </v-tab>
        <v-spacer></v-spacer>
        <v-tab to="/user/cabinet" v-if="user">
          Кабинет
        </v-tab>
        <v-tab to="/user/login" v-if="!user">
          Вход
        </v-tab>
        <v-tab @click="logout" v-if="user">
          Выход
        </v-tab>
        <v-tab to="/user/signup" v-if="!user">
          Регистрация
        </v-tab>
<!--        <v-tabs-slider color="pink"></v-tabs-slider>-->
      </v-tabs>

      <v-btn icon @click="switchTheme">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt/>
    </v-main>
    <SnackBar/>
  </v-app>
</template>

<script>

export default {
  computed: {
    user() {
      return this.$store.getters.getLoggedUser
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('auth/logout')
          .then(()=>this.$router.push('/user/login'))
    },
    switchTheme(){
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
      localStorage.setItem('themeDark', this.$vuetify.theme.isDark)
    }
  },
  created() {
    this.$vuetify.theme.isDark = JSON.parse(localStorage.getItem('themeDark'))
    //this.$axios.$get('/build-date')        .then(res => this.buildDate = res.ctime)
    //this.$store.dispatch('auth/getUser')
  },

}
</script>

<style lang="sass">
h1
  border-bottom: 1px solid silver
  margin-bottom: 10px
</style>
