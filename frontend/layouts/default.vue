<template>
  <v-app>
    <v-app-bar
        fixed
        app
    >
      <v-tabs v-model="tab">
        <v-tab to="/">
          Поиск
        </v-tab>
        <v-tab to="/organisation">
          Организации
        </v-tab>
        <v-tab to="/article">
          Статьи
        </v-tab>
        <v-tabs-slider color="pink"></v-tabs-slider>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn icon @click="switchTheme">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
      <nuxt/>
      </v-container>
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
    switchTheme(){
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
      localStorage.setItem('themeDark', this.$vuetify.theme.isDark)
    }
  },
  created() {
    this.$vuetify.theme.isDark = JSON.parse(localStorage.getItem('themeDark'))
    //this.$axios.$get('/build-date')        .then(res => this.buildDate = res.ctime)
    //this.$store.dispatch('auth/getUser')
  }
}
</script>

<style lang="sass">
h1
  border-bottom: 1px solid silver
  margin-bottom: 10px
</style>
