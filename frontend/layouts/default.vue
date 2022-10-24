<template>
  <v-app>
    <v-app-bar fixed app dense>
      <v-app-bar-title>
        <link to="/" tag style="cursor:pointer">
        Веб конфигуратор
        </link>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn id to="/configurator/start">
          Конфигуратор
        </v-btn>
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
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item>
            <v-list-item to="/admin/upload">
              <v-list-item-title>Upload components</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu rounded="true" open-on-hover offset-y transition="slide-x-transition" bottom right v-if="user?.isAdmin">
          <template v-slot:activator="{ on, attrs }">
            <v-btn id v-bind="attrs" v-on="on">
              Кабинет
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item to="/cabinet/settings">
              <v-list-item-title>Настройки</v-list-item-title>
            </v-list-item>
            <v-list-item to="/cabinet/assemblies">
              <v-list-item-title>Сборки</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn to="/user/signup" v-if="!user" id>Регистрация</v-btn>
        <v-btn to="/user/login" v-if="!user" id>Вход</v-btn>
        <v-btn @click="logout" v-if="user" id>Выход</v-btn>
      </v-toolbar-items>

    </v-app-bar>
    <!--    <v-app-bar
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
            <v-menu
                top
                :close-on-content-click="true"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-tab
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                  Dropdown
                </v-tab>
              </template>

              <v-list>
                <v-list-item                to="/admin/users"            >
                  <v-list-item-title>Users</v-list-item-title>
                </v-list-item>
                <v-list-item                to="/admin/upload"            >
                  <v-list-item-title>Upload components</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-tab to="/admin/users" v-if="user?.isAdmin">
              Admin Users
            </v-tab>
            <v-tab to="/admin/upload" v-if="user?.isAdmin">
              Admin Upload
            </v-tab>
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
    &lt;!&ndash;        <v-tabs-slider color="pink"></v-tabs-slider>&ndash;&gt;
          </v-tabs>

          <v-btn icon @click="switchTheme">
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-btn>
        </v-app-bar>-->
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
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
          .then(() => this.$router.push('/user/login'))
    },
    switchTheme() {
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
      localStorage.setItem('themeDark', this.$vuetify.theme.isDark)
    }
  },
  created() {
    this.$vuetify.theme.isDark = JSON.parse(localStorage.getItem('themeDark'))
    //this.$axios.$get('/build-date')        .then(res => this.buildDate = res.ctime)
    this.$store.dispatch('auth/getUser')
  },

}
</script>

<style lang="sass">
h1
  border-bottom: 1px solid silver
  margin-bottom: 10px
</style>
