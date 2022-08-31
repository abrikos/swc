<template>
  <div>
    <h1>{{ $t('Cabinet') }}</h1>
    {{ user }}
    <v-card
        v-if="user"
    >
      <v-card-text>
        <v-text-field
            outlined
            v-model="user.username"
            :label="$t('Username')"
        />
        <v-text-field
            outlined
            v-model="user.email"
            :label="$t('Email')"
            :rules="[value => !!value || this.$t('Required')]"
        />

      </v-card-text>
      <v-card-actions>
        <v-btn @click="update" color="primary" class="my-4">{{ $t('Save') }}</v-btn>
      </v-card-actions>
    </v-card>
    {{user}}
  </div>
</template>

<script>

export default {
  name: "cabinet",
  middleware: ['auth'],
  computed: {
    user() {
      return {...this.$store.getters.getLoggedUser}
    }
  },
  data() {
    return {
      data: this.user
    }
  },
  methods: {
    update() {
      this.$axios.$post('/user/update', this.user)
          .then(user => {
            this.$store.dispatch('auth/getUser')
          })

    }
  }
}
</script>

<style scoped>

</style>
