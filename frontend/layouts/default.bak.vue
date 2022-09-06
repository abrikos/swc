<template>
  <v-app dark>
    <AppBar/>
    <v-main>
      <v-navigation-drawer
          app
          v-if="user"
      >
        <v-list>
          <!--          <v-list-item class="px-2">
                      <v-list-item-avatar>
                        <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
                      </v-list-item-avatar>
                    </v-list-item>-->

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{user.username}}
              </v-list-item-title>
              <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider/>

        <v-list
            nav
            dense
        >
          <v-list-item link to="/user/cabinet">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{$t('Cabinet')}}</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/ticket/list">
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{$t('My tickets')}}</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/ticket/create">
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{$t('Create ticket')}}</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Starred</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-container>
        <nuxt/>
      </v-container>
    </v-main>
    <SnackBar/>
  </v-app>
</template>

<script>
import SnackBar from '@/components/SnackBar';
import AppBar from '@/components/app-bar/AppBar';

export default {
  components: {AppBar, SnackBar},
  computed:{
    user(){
      return this.$store.getters.getLoggedUser
    }
  },
  created() {
    this.$vuetify.theme.isDark = true

    this.$axios.$get('/build-date')
        .then(res => this.buildDate = res.ctime)
    this.$store.dispatch('auth/getUser')
  }
}
</script>

<style lang="sass">
h1
  border-bottom: 1px solid silver
  margin-bottom: 10px
</style>
