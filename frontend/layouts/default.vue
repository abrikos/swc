<template>
  <v-app>
    <AppBar/>
    <v-container>
      <nuxt/>
    </v-container>
    <SnackBar/>
  </v-app>
</template>

<script>
import SnackBar from '@/components/SnackBar';
import AppBar from '@/components/app-bar/AppBar';

export default {
  components: { AppBar, SnackBar},
}
</script>

<style lang="sass">
h1
  border-bottom: 1px solid silver
  margin-bottom: 10px
</style>
