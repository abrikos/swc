<template>
  <v-app>
    <AppBar/>
    <v-container fluid class="game-table">
      <nuxt/>
    </v-container>
    <SnackBar/>
  </v-app>
</template>

<script>
import SnackBar from '@/components/SnackBar';
import AppBar from '@/components/app-bar/AppBar';

export default {
  name: 'wide',
  components: {AppBar, SnackBar},
}
</script>

<style scoped lang="sass">
.game-table
  height: 100vh
  background-color: green !important
  color: yellow
</style>
