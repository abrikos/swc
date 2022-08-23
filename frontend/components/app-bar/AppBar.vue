<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
    >
      <v-list>
        <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
        :clipped-left="clipped"
        fixed
        app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
          icon
          @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-spacer />
      <v-tabs :hide-slider="true">
        <v-tab to="/">
          {{$t('Home')}}
        </v-tab>
        <v-spacer></v-spacer>
        <v-tab to="/user/cabinet" v-if="user">
          {{$t('Cabinet')}}
        </v-tab>
        <v-tab @click="logout" v-if="user">
          {{$t('Logout')}}
        </v-tab>
        <v-tab to="/user/login" v-if="!user">
          {{$t('Login')}}
        </v-tab>
        <v-tab to="/user/signup" v-if="!user">
          {{$t('Sign up')}}
        </v-tab>
      </v-tabs>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              icon
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>mdi-earth</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
              v-for="(item, index) in availableLocales"
              :key="index"
          >
            <v-list-item-title>
              <v-btn @click="switchLocale(item.code)">{{ item.name }}</v-btn>

            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  name: "AppBar",
  data() {
    return {
      tab: 0,
      clipped: false,
      fixed: false,
      drawer: false,
      group: {},
      buildDate:'',
      miniVariant: false,
      right: true,
      rightDrawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(l => l.code !== this.$i18n.locale)
    },
    localeName() {
      const locale = this.$i18n.locales.find(l => l.code === this.$i18n.locale)
      return locale.name
    },
    user(){
      return this.$store.getters.getLoggedUser
    }
  },
  created() {
    this.$axios.$get('/build-date')
      .then(res=>this.buildDate = res.ctime)
    this.$nuxt.$on('userReloaded', (data) => {
      this.user = data;
    });
    this.$store.dispatch('auth/getUser')
  },
  methods: {
    switchLocale(code) {
      this.$i18n.setLocale(code)
    },
    async logout() {
      this.$store.commit('auth/logout')
      this.$saveDefaultRedirect()
      await this.$router.push('/user/login');
    },

  }

}
</script>

<style scoped lang="sass">
small#build-date
  color: red
  font-size: .6em !important
</style>
