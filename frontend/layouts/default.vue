<template>
  <v-app>
    <v-app-bar fixed app dense class="main-menu">
      <v-app-bar-title>
        <v-btn to="/">
          <img src="/logo.png" class="logo"/>
        </v-btn>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn id to="/configurations/chassis" v-if="user">
          Выбор шасси
        </v-btn>
<!--        <v-btn to="/configurations/list" v-if="user">Конфигурации</v-btn>-->
        <v-btn to="/specifications/list" v-if="user">Спецификации</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-menu rounded="true" open-on-hover offset-y transition="slide-x-transition" bottom right v-if="user?.isAdmin">
          <template v-slot:activator="{ on, attrs }">
            <v-btn id v-bind="attrs" v-on="on">
              Admin
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item to="/admin/users">
              <v-list-item-title>Список пользователей</v-list-item-title>
            </v-list-item>
            <v-list-item to="/admin/import">
              <v-list-item-title>Импорт данных</v-list-item-title>
            </v-list-item>
            <v-list-item to="/admin/chassis-list">
              <v-list-item-title>Шасси</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn to="/cabinet/settings" v-if="user">{{ user.email }}</v-btn>
        <v-btn to="/user/signup" v-if="!user" id>Регистрация</v-btn>
        <v-btn to="/user/login" v-if="!user" id>Вход</v-btn>
        <v-btn @click="logout" v-if="user" id>Выход</v-btn>
        <!--        <v-btn icon @click="switchTheme">
                  <v-icon>mdi-theme-light-dark</v-icon>
                </v-btn>-->
      </v-toolbar-items>

    </v-app-bar>
    <v-main>
      <v-container>
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
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
    },
    breadcrumbs() {
      const routes = {
        home: {text: 'Главная', href: '/'},
        //'configurations-list': {text: 'Конфигурации', href: '/configurations/list'},
        'configurations-chassis':{text: 'Выбор шасси', href: '/configurations/chassis'},
        'specifications-list': {text: 'Спецификации', href: '/specifications/list'},
        'specifications-specId': {text: 'Просмотр спецификации', disabled: true, parent: 'specifications-list'},
        'configurations-configurationId':{text: 'Просмотр конфигурации', disabled: true, parent:'specifications-list'},
        'cabinet-settings':{text: 'Кабинет настройки'},
        'user-login':{text: 'Вход'},
        'user-signup':{text: 'Регистрация'},
        'admin-users':{text: 'Редактирование пользователей'},
        'admin-upload':{text: 'Загрузка базы', disabled: true},
        'admin-chassis-list':{text: 'Загрузка изображений шасси'},
      }
      console.log(this.$route.name)
      const crumbs = [routes.home]
      const current = routes[this.$route.name]
      if(!current) return crumbs
      if(current.parent) crumbs.push(routes[current.parent])
      current.disabled = true;
      crumbs.push(current)
      return crumbs
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
      //this.$store.dispatch('auth.js.bak/logout')
    },
    switchTheme() {
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
      //localStorage.setItem('themeDark', this.$vuetify.theme.isDark)
    }
  },
  created() {
    //console.log('zzzzzzzzzzzz', this.$route.name, this.$route)
    //this.$vuetify.theme.isDark = JSON.parse(localStorage.getItem('themeDark'))
    //this.$axios.$get('/build-date')        .then(res => this.buildDate = res.ctime)
  },

}
</script>

<style lang="sass">
.v-application
  .v-breadcrumbs
    li.v-breadcrumbs__divider
      color: gray
    a
      color: gray

  .logo
    height: 30px
  font-family: "Roboto2"

  strong
    font-family: "RobotoBold"

  .main-menu
    div
      background-color: #ccc

    .v-btn:before
      opacity: 0

    .v-btn
      box-shadow: none
      background: none
      border: none

    .v-btn--active
      .v-btn__content
        font-weight: bold
        background: none
        color: #aa2238

pointer
  cursor: pointer
.v-btn
  img
    height: 50px
h1
  border-bottom: 1px solid silver
  margin-bottom: 10px
  text-align: center

  small
    font-size: .5em
    font-weight: lighter

h4
  text-align: center

#container
  width: 1024px
  margin: auto
</style>
