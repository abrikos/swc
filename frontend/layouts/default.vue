<template>
  <v-app dark>
    <AppBar/>
    <v-main>
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
  components: { AppBar, SnackBar},
  created() {
    this.$vuetify.theme.isDark = true
  }
}
</script>

<style lang="sass">
h1
  border-bottom: 1px solid silver
  margin-bottom: 10px
</style>
